import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,


} from 'react-native';

export default function ItemCart(props) {
    const [counter, setCounter] = useState(0);
    const { image } = props.item;
    const { title } = props.item;
    const { price } = props.item;

    return (

        <View style={styles.container}>
            <TouchableOpacity>
                <Image
                    style={styles.image}
                    source={{ uri: image }}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <View style={{
                flexDirection: "row", alignContent: "center",
                alignItems: "center", flex: 1, width: 50, height: 50
            }}>

                <View style={styles.textCostum}>
                    <View style={{ marginStart: 15, marginVertical: 15, }}>
                        <Text style={styles.textDesign}>{title}</Text>
                    </View>
                </View>
            </View>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 0.7,
        borderBottomColor: "grey",
        marginStart: 16,
        alignItems: "center",
        backgroundColor: "#F5F9F6",
        marginEnd: 10,
        flexDirection: "row"
    },

    image: {
        height: 50,
        width: 50,
        borderRadius: 50,
        resizeMode: "cover"
    },
    textCostum: {
        alignContent: "center",
        flex: 1,
        flexDirection: "row"
    },
    textDesign: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold"
    },

});