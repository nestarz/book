"use strict";

// const fs = require(`fs-extra`);
const fs = require(`fs`);

exports.onCreateNode = require(`./on-node-create`);
exports.setFieldsOnGraphQLNodeType = require(`./extend-node-type`);
exports.downloadMediaFiles = require(`./download-image`);