## JSONata Rhino for Apigee

This repo exposes the [jsonata](http://jsonata.org/) library re-packaged to make it work within a 
ES5 [Rhino JavaScript run-time](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino) environment.

If your runtime environment is anything else other than Rhino, please use the official JSONata minified
distribution over at https://github.com/jsonata-js/jsonata.

The main purpose of this repo is to offer a distribution that can be used within an 
[Apigee JavaScript policy](https://docs.apigee.com/api-platform/reference/policies/javascript-policy).


### Pre-built distribution

You can find pre-build distribution files over in the dist/ directory. You can grab these as-is, and use 
them in Apigee.


### Using in Apigee

In order to use the library in an Apigee JavaScript policy, you must refer have the library included using
the `<IncludeURL>` element.

Here is an example JavaScript policy:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Javascript async="false" continueOnError="false" enabled="true" timeLimit="200" name="JSONata">
    <DisplayName>JSONata</DisplayName>
    <Properties/>
    <IncludeURL>jsc://jsonata.v1.6.5.rhino.js</IncludeURL>
    <ResourceURL>jsc://my-business-logic.js</ResourceURL>
</Javascript>
```


Following form the example above, within the `my-business-logic.js`file you would be able to refer to the
global object `jsonata`, and write your own custom transformation logic.

For example:

```javascript

var data = {
  "a": {
    "id": "aye",
    "namespace": "bob"
  },
  "b": [
    {
      "bx": "12",
      "by": "34"
    },
    {
      "bx": "56",
      "by": "78"
    }
  ],
  "c": "see",
  "d": {
    "data": "ignored"
  },
  "e": "eeeeh"
};

var expression = jsonata(
'{                               \n\
  "m": c,                        \n\
  "n": e,                        \n\
  "o": b.{                       \n\
    "oa": $$.a.{                 \n\
      "code": id,                \n\
      "ns": namespace,           \n\
      "q": id & "@" & namespace  \n\
    },                           \n\
    "ox": bx,                    \n\
    "oy": by                     \n\
  },                             \n\
  "p": "hardcoded"               \n\
}');

var result = expression.evaluate(data); 
context.setVariable('response.content', JSON.stringify(result, null, 2));
```


Note, that I am using a multiline JSONata expression by using the 
newline escape sequence, followed by the line-continuation character.  (i.e. `\n\`)





### Build Prerequisites

  * Bash shell (your OS must have bash)
  * [Install Docker](https://docs.docker.com/install/)
  

The build process itself runs inside docker, so it should work well across different operating
systems a long as you have both bash, and docker installed in your system.

### Building it

If you want to build the library yourself (as opposed to using the pre-built files in the `dist` directory), use the 
following command:

```bash
 MODE=production BRANCH=master ./build.sh
```

In the example above, I am showing how to build the library in production mode, from the JSONata master branch.

The `MODE` environment variable maps directly to the `mode` property in webpack. Supported modes are: `production` and `development`. When you build in `production` mode, the resulting build output is
minified. When you build in `development` mode, the resulting build output is not minified.

The `BRANCH` environment variable specifies which Git branch is checked-out after the JSONata repo is cloned during
the build process. You can specify actual branch names, or even tag names from the JSONata repo. See the full list of
tags over at https://github.com/jsonata-js/jsonata/tags.


### Not Google Product Clause

This is not an officially supported Google product.