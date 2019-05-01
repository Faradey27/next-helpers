import React from 'react';
import { object, bool } from 'prop-types';

const isOnServer = ctx => Boolean(ctx.req);
const getDisplayName = WrappedComponent =>  WrappedComponent.displayName || WrappedComponent.name || 'Component';

const withSSR = (Page, { initialProps } = {}) => {
  class SSR extends React.Component {
    static propTypes = {
      _shouldFetchOnMount: bool, // from getInitialProps, in case when we load on mount
    }

    static getInitialProps(ctx) {
      return Page.getInitialProps && isOnServer(ctx)
        ? Page.getInitialProps(ctx)
        : Promise.resolve({ _shouldFetchOnMount: true })
    }

    state = {
      dataFromGetInitialProps: null,
      error: null,
    };

    componentDidMount() {
      if (this.props._shouldFetchOnMount) {
        Page
          .getInitialProps(this.props)
          .then(
            data => this.setState(state => ({ dataFromGetInitialProps: data })),
            error => this.setState(state => ({ error, data: null }))
          );
      }
    }

    getPropsToTransfer = () => {
      const propsToTransfer = {};
      if (this.state.error) {
        propsToTransfer.error = this.state.error;
      }
      for (const propName in this.props) {
        if (propName !== '_shouldFetchOnMount') {
          propsToTransfer[propName] = this.props[propName];
        }
      }

      return propsToTransfer;
    }

    render() {
      return (
        <Page
          {...initialProps}
          {...this.state.dataFromGetInitialProps}
          {...this.getPropsToTransfer()}
        />
      );
    }
  }

  SSR.displayName = `SSR(${getDisplayName(Page)})`;

  return SSR;
}

export default withSSR;
