import { Route as ReactRoute, Redirect } from 'react-router-dom';
import React from 'react';
import { Loading } from 'AppComponents';

// component variable is renamed to Component for syntax highlighting
export const Route = ({ component:Component, path, isLoading, redirectTo, ...restProps }) => {
  return (
    <ReactRoute
      path={path}
      render={(routeProps) => {
        if (isLoading) {
          return <Loading />
        }
        if (redirectTo) {
          return <Redirect to={redirectTo} />
        }
        return (
          <Component
            {...routeProps}
            {...restProps}
          />
        )
      }}
    />
  )
}
