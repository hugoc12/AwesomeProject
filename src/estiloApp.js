import React from 'react';
import {StyleSheet} from 'react-native';

export default estiloApp = StyleSheet.create({
    containerPrincipal:{
        flexGrow:1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'#43919B',
        paddingTop:10
    },

    viewInput:{
        width: '90%',
        alignItems:'center',
        marginVertical:10,
    },

    viewBtts:{
        width: '90%',
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'space-between'
    },

    txtInput:{
        width: '100%',
        padding: 10,
        color: '#fff',
        backgroundColor:'#247881',
        borderRadius:5,
        fontSize:20,
    },

    txtLabel:{
        width: '100%',
        color: '#fff',
        fontSize:20,
        marginBottom:5
    },

    txtTitle:{
        fontSize:25,
        color: '#fff',
        fontWeight:'bold',
    },

    btt:{
        textAlign:'center',
        padding: 10,
        borderRadius:5,
        color: '#fff',
        backgroundColor:'#247881',
    }
})