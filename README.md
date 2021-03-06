# Awakening Sequencers
A Node.js and SuperCollider framework to leverage [supercollider-redux](https://github.com/colinsullivan/supercollider-redux) and [abletonlink-redux](https://github.com/colinsullivan/abletonlink-redux/) to build systems with synchronized sound.

## Examples

To run the examples:

    npm install

For each example, there is a Node.js script and a SuperCollider script that must be run simultaneously.

### Basic Example
This example plays a metronome implemented in `MetronomeSequencer.sc`.  It is now in `testMetroExample.[js|sc]` as well.

    $ sclang src/example.sc
    # Warning, sound will play!!
    $ npm run start_example


### Sampler
This example demonstrates a sampler that requires samples are loaded.

    $ sclang src/example_sampler.js
    $ npm run start_sampler_example

### Parameterized
This example demonstrates how a SuperCollider pattern can be parameterized through the state store.  See `ParamExampleSequencer` in the quark.

    $ sclang src/parameter_example.sc
    $ npm run start_parameter_example


## Sidenotes

It is possible to run Node.js and a child SuperCollider process using [supercolliderjs](https://github.com/crucialfelix/supercolliderjs).  The unit tests do this.

## Unit Tests

There are two unit tests: `testMetroExample.[js|sc]` and `testOneShotMetroExample.[js|sc]`.  Both of these have repeated code and can only be run one at a time.  To run:

    $ npm run test test/testMetroExample.js
    $ npm run test test/testOneShotMetroExample.js
