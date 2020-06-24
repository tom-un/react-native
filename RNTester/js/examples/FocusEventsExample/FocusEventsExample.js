/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict'; // TODO(OSS Candidate ISS#2710739)

var React = require('react');
var ReactNative = require('react-native');
import {Platform} from 'react-native';
var {StyleSheet, Text, View, TextInput} = ReactNative;

type State = {
  eventStream: string,
};

class FocusEventExample extends React.Component<{}, State> {
  state: State = {
    eventStream: '',
  };

  render() {
    return (
      <View>
        <Text>
          Focus events are called when a component receives or loses focus. This
          can be acquired by manually focusing components
          {Platform.OS === 'macos' ? ' or using tab-based nav' : ''}
        </Text>
        <View>
          <TextInput
            onFocus={() => {
              this.setState(prevState => ({
                eventStream: prevState.eventStream + '\nTextInput Focus',
              }));
            }}
            onBlur={() => {
              this.setState(prevState => ({
                eventStream: prevState.eventStream + '\nTextInput Blur',
              }));
            }}
            placeholder={'TextInput'}
            placeholderTextColor={
              Platform.OS === 'macos' ? {semantic: 'textColor'} : 'black'
            }
            style={styles.textInput}
          />

          {// Only test View on MacOS, since canBecomeFirstResponder is false on all iOS, therefore we can't focus
          Platform.OS === 'macos' ? (
            <View
              acceptsKeyboardFocus={true}
              enableFocusRing={true}
              onFocus={() => {
                this.setState(prevState => ({
                  eventStream: prevState.eventStream + '\nView Focus',
                }));
              }}
              onBlur={() => {
                this.setState(prevState => ({
                  eventStream: prevState.eventStream + '\nView Blur',
                }));
              }}>
              <Text>Focusable View</Text>
            </View>
          ) : null}

          <View
            onFocus={() => {
              this.setState(prevState => ({
                eventStream:
                  prevState.eventStream +
                  '\nNested Singleline TextInput Parent Focus',
              }));
            }}
            onBlur={() => {
              this.setState(prevState => ({
                eventStream:
                  prevState.eventStream +
                  '\nNested Singleline TextInput Parent Blur',
              }));
            }}>
            <TextInput
              onFocus={() => {
                this.setState(prevState => ({
                  eventStream:
                    prevState.eventStream +
                    '\nNested Singleline TextInput Focus',
                }));
              }}
              onBlur={() => {
                this.setState(prevState => ({
                  eventStream:
                    prevState.eventStream +
                    '\nNested Singleline TextInput Blur',
                }));
              }}
              style={styles.textInput}
              placeholder={'Nested Singleline TextInput'}
              placeholderTextColor={
                Platform.OS === 'macos' ? {semantic: 'textColor'} : 'black'
              }
            />
          </View>

          {// Only test View on MacOS, since canBecomeFirstResponder is false on all iOS, therefore we can't focus
          Platform.OS === 'macos' ? (
            <View
              onFocus={() => {
                this.setState(prevState => ({
                  eventStream:
                    prevState.eventStream + '\nNested View Parent Focus',
                }));
              }}
              onBlur={() => {
                this.setState(prevState => ({
                  eventStream:
                    prevState.eventStream + '\nNested View Parent Blur',
                }));
              }}>
              <View
                acceptsKeyboardFocus={true}
                enableFocusRing={true}
                onFocus={() => {
                  this.setState(prevState => ({
                    eventStream: prevState.eventStream + '\nNested View Focus',
                  }));
                }}
                onBlur={() => {
                  this.setState(prevState => ({
                    eventStream: prevState.eventStream + '\nNested View Blur',
                  }));
                }}>
                <Text>Nested Focusable View</Text>
              </View>
            </View>
          ) : null}

          <View
            onFocus={() => {
              this.setState(prevState => ({
                eventStream:
                  prevState.eventStream +
                  '\nNested Multiline TextInput Parent Focus',
              }));
            }}
            onBlur={() => {
              this.setState(prevState => ({
                eventStream:
                  prevState.eventStream +
                  '\nNested Multiline TextInput Parent Blur',
              }));
            }}>
            <TextInput
              onFocus={() => {
                this.setState(prevState => ({
                  eventStream:
                    prevState.eventStream +
                    '\nNested Multiline TextInput Focus',
                }));
              }}
              onBlur={() => {
                this.setState(prevState => ({
                  eventStream:
                    prevState.eventStream + '\nNested Multiline TextInput Blur',
                }));
              }}
              style={styles.textInput}
              multiline={true}
              placeholder={'Nested Multiline TextInput'}
              placeholderTextColor={
                Platform.OS === 'macos' ? {semantic: 'textColor'} : 'black'
              }
            />
          </View>

          <Text>{'Events: ' + this.state.eventStream + '\n\n'}</Text>
        </View>
      </View>
    );
  }
}

class FocusTrapExample extends React.Component<{}, {}> {
  render() {
    const nextKeyViewID = 'inputView4';
    return (
      <View>
        <Text>Focus trap example.</Text>
        <TextInput placeholder={'Focusable 1'} style={styles.textInput} />
        <TextInput placeholder={'Focusable 2'} style={styles.textInput} />
        <TextInput placeholder={'Focusable 3'} style={styles.textInput} />
        <Text>Begin focus trap:</Text>
        <TextInput
          nativeID={nextKeyViewID}
          placeholder={'Focusable 4'}
          style={styles.textInput}
        />
        <TextInput placeholder={'Focusable 5'} style={styles.textInput} />
        <TextInput
          nextKeyViewID={nextKeyViewID}
          placeholder={'Focusable 6'}
          style={styles.textInput}
        />
        <Text>End focus trap:</Text>
        <TextInput placeholder={'Focusable 7'} style={styles.textInput} />
        <TextInput placeholder={'Focusable 8'} style={styles.textInput} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  textInput: {
    ...Platform.select({
      macos: {
        color: {semantic: 'textColor'},
        backgroundColor: {semantic: 'textBackgroundColor'},
        borderColor: {semantic: 'gridColor'},
      },
      default: {
        borderColor: '#0f0f0f',
      },
    }),
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    fontSize: 13,
    padding: 4,
  },
});

exports.title = 'Focus Events';
exports.description = 'Examples that show how Focus events can be used.';
exports.examples = [
  {
    title: 'FocusEventExample',
    render: function(): React.Element<any> {
      return <FocusEventExample />;
    },
  },
  {
    title: 'FocusTrapExample',
    render: function(): React.Element<any> {
      return <FocusTrapExample />;
    },
  },
];
