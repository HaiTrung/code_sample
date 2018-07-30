import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { matchingStr } from '../action/index’;
import styles from './styles’;

const { width } = Dimensions.get('window');
const base = 256;
const MOD = 101;

class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            subtext: '',
            result: '',
        };
		this.handleMatchStr = this.handleMatchStr.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={[styles.input_style, styles.substr_style]}
                    placeholder='Nhap subtext'
                    onChangeText={(subtext) => this.setState({ subtext: subtext })}
                    value={this.state.subtext}
                />
                <TextInput
                    multiline={true}
                    numberOfLines={5}
                    style={[styles.input_style, styles.str_style]}
                    placeholder='Nhap text'
                    onChangeText={(text) => this.setState({ text: text })}
                    value={this.state.text}
                />
                <TouchableOpacity
                    style={styles.button_style}
                    onPress={this.handleMatchStr}
                >
                    <Text> Check</Text>
                </TouchableOpacity>
                <Text
                    style={styles.result_style}
                >
                    Ket qua: {this.state.result}
                </Text>
            </View>
        );
    }

    handleMatchStr() {
        let text = this.state.text.toLowerCase(),
            subtext = this.state.subtext.toLowerCase(),
            lengthText = this.state.text.length,
            lengthSubText = this.state.subtext.length,
            POW = 1,
            hashT = 0,
            hashP = 0;

        // Precalculate base^i
        for (let i = 0; i < (lengthText - 1); i++) {
            POW = (POW * base) % MOD;
        }

        // Calculate hash value of P
        for (let i = 0; i < lengthSubText; i++) {
            hashP = (hashP * base + subtext[i].charCodeAt()) % MOD;
            hashT = (hashT * base + text[i].charCodeAt()) % MOD;
        }

        // Finding substrings of T equal to string P
        let arrPosition = '';
        for (let i = 0; i <= (lengthText - lengthSubText); i++) {
            if (hashP == hashT) {
                let j = 0;
                for (j = 0; j < lengthSubText; j++) {
                    if (text[i + j] != subtext[j]) {
                        break;
                    }
                }

                if (j == lengthSubText) {
                    arrPosition += (i + 1) + ' ';
                }
            }

            if (i < (lengthText - lengthSubText)) {
                hashT = 0;
                for (let k = i + 1; k < lengthSubText + i + 1; k++) {
                    hashT = (hashT * base + text[k].charCodeAt()) % MOD;
                }
            }
        }

        if (arrPosition.trim() != '') {
            this.setState({
                result: arrPosition,
            });

            this.props.dispatch(matchingStr(arrPosition));
        }
        else {
            this.setState({
                result: 'no matches',
            });
        }
    }
}

const mapStateToProps = state => {
    return {
        textResult: state.text,
    }
}

export default connect(mapStateToProps)(Root);

