# vue-gauge

This is a Vue JS component plugin to create gauge charts, which are dynamic and animated. Some styling can be customised to change the look and feel of the gauge to match your required look or theme.

## Installation

This is available as an NPM package, it can be installed via one of the following.

### NPM

```
npm i @chrisheanan/vue-gauge -S
```

### Yarn

```
yarn add @chrisheanan/vue-gauge
```

## Usage

This is a minumum working example:

```
<template>
    <gauge
        heading="A title goes here"
        :min="0"
        :max="100"
        :value="exampleValue"
    />
</template>

<script>
import Gauge from '@chrisheanan/vue-gauge';

export default {
  components: {
    Gauge
  },
  data() {
    return {
      exampleValue: 35
    };
  }
};
```

## Demo

To run the demo for the package just run the serve script...

```
npm run serve
```

or if you use yarn...

```
yarn serve
```

Then visit the following in your browser

```
http://localhost:8080
```

## Props

The gauge component has the following props

| Prop                | Description                                                                                                                                  | Type    | Required | Default        |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- | -------------- |
| value               | Value the pointer is set/pointing at                                                                                                         | Number  | TRUE     |                |
| heading             | Sets the title/heading for the gauge chart                                                                                                   | String  | TRUE     | -              |
| headingLevel        | Sets the H tag with this number, so the default of 2 creates a `<h2>` title tag                                                              | Number  | FALSE    | 2              |
| fontSize            | Sets the base font size for the component                                                                                                    | String  | FALSE    | "1em"          |
| min                 | Minimum limit of the gauge value                                                                                                             | Number  | TRUE     | -              |
| minThresholdFill    | Set the colour for the arc, when in the value is within the minimum threshold limit                                                          | String  | FALSE    | "none"         |
| minLabel            | If used, overrides what is displayed at the maximum point label                                                                              | String  | FALSE    | null           |
| max                 | Maximum limit of the gauge value                                                                                                             | Number  | TRUE     | -              |
| maxThresholdFill    | Set the colour for the arc, when in the value is within the maximum threshold limit                                                          | String  | FALSE    | "none"         |
| maxLabel            | If used, overrides what is displayed at the mimimum point label                                                                              | String  | FALSE    | null           |
| maxThreshold        | Sets the threshold limit on the maximum side of the arc                                                                                      | Number  | FALSE    | null           |
| minThreshold        | Sets the threshold limit on the minimum side of the arc                                                                                      | Number  | FALSE    | null           |
| dp                  | Number of decimal places displayed on the value label                                                                                        | Number  | FALSE    | 0              |
| unit                | Unit to be displayed after labels                                                                                                            | String  | FALSE    | null           |
| unitOnArc           | Show the unit, if set, on the min and max labels                                                                                             | Boolean | FALSE    | TRUE           |
| labelsOnArc         | Show the min and max labels                                                                                                                  | Boolean | FALSE    | TRUE           |
| valueToExceedLimits | If set, the value will display above or below the min and max limitations, otherwise the display value will be cap to the min and max limits | Boolean | FALSE    | FALSE          |
| radius              | Set the radius of the gauge chart                                                                                                            | Number  | FALSE    | 215            |
| thickness           | Sets the thickness of the gauge arc                                                                                                          | Number  | FALSE    | 70             |
| activeFill          | Set the colour for the used/active part of the arc                                                                                           | String  | FALSE    | "currentcolor" |
| inactiveFill        | Set the colour for the unused/unactive part of the arc                                                                                       | String  | FALSE    | "currentcolor" |
| pointerGap          | Set the angle in degrees for the gap between the pointer and the arc                                                                         | Number  | FALSE    | 4              |
| pointerStroke       | Set the colour storke/outline for the gauge needle                                                                                           | String  | FALSE    | "currentcolor" |
| pointerStrokeWidth  | Set the width/thickness for the gauge needle                                                                                                 | Number  | FALSE    | 14             |
| pivotRadius         | Sets the radius for the gauge needle dot                                                                                                     | Number  | FALSE    | 20             |
| pivotStrokeWidth    | Set the width/thickness for the gauge needle dot                                                                                             | Number  | FALSE    | 2              |
| pivotStroke         | Set the colour storke/outline for the gauge needle dot                                                                                       | String  | FALSE    | "currentcolor" |
| pivotFill           | Set the colour fill for the gauge needle dot                                                                                                 | String  | FALSE    | "currentcolor" |

## Author

[Christopher David Heanan](https://chrish.dev)

## License

This project is licensed under the BSD-3-Clause

Copyright 2020 Christopher David Heanan

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
