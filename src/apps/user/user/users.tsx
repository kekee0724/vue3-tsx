import React from 'react';

import { connect } from 'dva';

export const Users = connect(mapStateToProps)((props: any) => {
  const { countNamespace: state } = props;
  console.log(props, state)
  return (
    <div>
      Route Component: Users
    </div>
  );
})

function mapStateToProps() {
  return {};
}