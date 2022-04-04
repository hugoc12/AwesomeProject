import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function CardBook(props){
    return(
        <View style={estilo.containerCard}>
            <Text style={estilo.txtTitle}> {props.book._id}- {props.book.nome}</Text>
            <Text style={estilo.txtValor}>R${Number(props.book.preco).toFixed(2)}</Text>

            <View style={estilo.containerBtts}>
                <TouchableOpacity style={{width:'45%'}} onPress={()=>{props.editCard(true); props.setNomeLivro(props.book.nome); props.setPrecoLivro(props.book.preco); props.setIdLivro(props.book._id)}}>
                    <Text style={estilo.btt}>EDITAR</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{width:'45%'}} onPress={()=>props.excluirBook(props.book)}>
                    <Text style={estilo.btt}>EXCLUIR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const estilo = StyleSheet.create({
    containerCard:{
        alignItems:'flex-start',
        justifyContent:'space-evenly',
        backgroundColor:'#30AADD',
        marginVertical:10,
        padding: 10,
        borderRadius:5
    },

    containerBtts:{
        width: '100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
    },

    btt:{
        textAlign:'center',
        backgroundColor:'#247881',
        padding: 5,
        borderRadius:5,
        color: '#fff',
    },

    txtTitle:{
        color: '#fff',
        width: '100%',
        textAlign:'center',
        fontSize:25,
        marginBottom:5,
        fontWeight:'bold',
    },

    txtValor:{
        color: '#fff',
        width: '100%',
        textAlign:'center',
        fontSize:20,
        marginBottom:5,
        fontWeight:'bold',
    }
})