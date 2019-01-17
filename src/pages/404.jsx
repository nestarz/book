import React, { useState } from 'react';
import { Layout } from 'components';

const NotFoundPage = () => {
  var userLang = typeof navigator != "undefined" ? navigator.language || navigator.userLanguage : "fr";
  const [lg, setLanguage] = useState(userLang == "fr-FR" ? "fr" : "en");
  return (
    <Layout>
      <h1>{lg == "fr"? "Perdu ?": "NOT FOUND"}</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}
export default NotFoundPage
