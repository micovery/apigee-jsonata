// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var path = require('path');

module.exports = {
    entry: `./jsonata.rhino.js`,
    output: {
        library: 'jsonata',
        libraryTarget:'var',
        path: path.resolve(__dirname, './dist'),
        filename: `jsonata.${process.env.BRANCH}.rhino.js`,
        jsonpFunction: 'jsonpApp2'
    },
    // devtool: "source-map",
    mode: process.env.MODE,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'string-replace-loader',
                options: {
                    search: 'String.fromCodePoint',
                    replace: 'fromCodePoint',
                    flags: 'g'
                }
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'string-replace-loader',
                options: {
                    search: 'Array.from',
                    replace: 'arrayFrom',
                    flags: 'g'
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [

    ]
};
