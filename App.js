import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, FlatList, Keyboard} from 'react-native';
import estiloApp from './src/estiloApp';

import CardBook from './src/components/cardBook';

import Realm from 'realm';
import getRealm from './src/services/realm';

export default function App(){
  const [nomeLivro, setNomeLivro] = useState('');
  const [precoLivro, setPrecoLivro] = useState('');
  const [idLivro, setIdLivro] = useState('');
  const [editCard, setEditCard] = useState(false);

  const [myBooks, setMyBooks] = useState([
    {
      id:'df4545',
      nome:'Harry Potter',
      preco:129.99
    },

    {
      id:'df4646',
      nome:'JS Expert',
      preco:99.99
    },
    
  ])

  useEffect(()=>{
    async function loadBook(){
      try{
        const realm = await getRealm();
        const data = realm.objects('Book');
        setMyBooks(data);
      }catch(err){
        console.log(err);
      }
    }

    loadBook();
  }, [])

  async function saveBook(data){
    try{
      const realm = await getRealm();
      const id = realm.objects('Book').sorted('_id', true).length > 0 ? realm.objects('Book').sorted('_id', true)[0]._id + 1 : 1

      const dadosLivro = {
        _id:id,
        nome:data.nome,
        preco:data.preco,
      }

      realm.write(()=>{
        realm.create('Book', dadosLivro);
      })

      const dadosAtualizados = realm.objects('Book').sorted('_id', false);
      setMyBooks(dadosAtualizados);

      
    }catch(err){
      console.log(err)
    }
  }

  function cadastrarLivro(){
      if(nomeLivro === '' || precoLivro === ''){
        throw new Error('Preencha todos os campos!');
      }
  
      const data = {nome:nomeLivro, preco:precoLivro};
  
      saveBook(data);
      
      setNomeLivro('');
      setPrecoLivro('');
      Keyboard.dismiss();
  }

  async function editarLivro(){
    try{
      const realm = await getRealm();
      await realm.write(()=>{

        realm.create('Book', {
          _id:idLivro,
          nome:nomeLivro,
          preco:precoLivro
        }, 'modified');

        setNomeLivro('');
        setPrecoLivro('');
        setEditCard(false);
        Keyboard.dismiss();
      })

      const dadosAtualizados = realm.objects('Book').sorted('_id', true);

      setMyBooks(dadosAtualizados);

    }catch(err){
      console.log(err);
    }
  }

  async function excluirBook(book){
    try{
      const realm = await getRealm();

      realm.write(()=>{
        realm.delete(realm.objects('Book').filtered('_id =' + book._id));
      })

      /*realm.write(()=>{
        realm.deleteAll();
      })*/

      const dadosAtualizados = realm.objects('Book').sorted('_id', false);
      setMyBooks(dadosAtualizados);

    }catch(err){
      console.log(err);
    }
  }

  

  return(
    <View style={estiloApp.containerPrincipal}>
      <Text style={estiloApp.txtTitle}>MEUS LIVROS</Text>

      <View style={estiloApp.viewInput}>
        <Text style={estiloApp.txtLabel}>Nome</Text>
        <TextInput value={nomeLivro} onChangeText={(txt)=>setNomeLivro(txt)} placeholder='Nome' placeholderTextColor={'#ccc'} style={estiloApp.txtInput}/>
      </View>

      <View style={estiloApp.viewInput}>
        <Text style={estiloApp.txtLabel}>Preço</Text>
        <TextInput value={precoLivro} onChangeText={(txt)=>setPrecoLivro(txt)} placeholder='Preço' placeholderTextColor={'#ccc'} style={estiloApp.txtInput}/>
      </View>

      {editCard
      ?
      <View style={estiloApp.viewBtts}>
          <TouchableOpacity style={{width:'40%'}} onPress={()=>editarLivro()}>
            <Text style={estiloApp.btt}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width:'40%'}} onPress={()=>setEditCard(false)}>
            <Text style={estiloApp.btt}>Cancelar</Text>
          </TouchableOpacity>
        </View>
        
        :

        <View style={[estiloApp.viewBtts, {justifyContent:'center'}]}>
          <TouchableOpacity style={{width:'40%'}} onPress={()=>cadastrarLivro()}>
            <Text style={estiloApp.btt}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      
      }

      <View style={{flex:1}}>
        <FlatList contentContainerStyle={{paddingBottom:20}} data={myBooks} renderItem={({item})=><CardBook book={item} editCard={setEditCard} setNomeLivro={setNomeLivro} setPrecoLivro={setPrecoLivro} setIdLivro={setIdLivro} excluirBook={excluirBook}/>} style={{width:'90%', marginTop:10}}/>
      </View>


    </View>
  )
}