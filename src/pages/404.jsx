import React from 'react';
import { Layout } from 'components';
import theme from '../../config/theme';

const NotFoundPage = () => (
  <Layout theme={theme.dark}>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
