import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TarefasToolbar, TarefasTable } from './components';

import {Button, Dialog,DialogActions,DialogContent,DialogTitle} from '@material-ui/core';

import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas';


const TarefaList = () => {
  const classes = useStyles();

  const [tarefas,setTarefas] = useState([]);
  const [openDialog,setOpenDialog]=useState(false);
  const [mensagem,setMensagem]=useState('');

  const salvar = (tarefa)=>{
    axios.post(API_URL,tarefa,{
      headers:{"x-tenant-id": localStorage.getItem('email_usuario_logado')}
    }).then(response=>{
      const novaTarefa =response.data;
      setTarefas([...tarefas,novaTarefa]);
      setMensagem("Item Adicionado com sucesso!");
      setOpenDialog(true);
    }).catch(erro => {
      console.log(erro);
      setMensagem('Ocorreu um erro', erro);
      setOpenDialog(true);
    })
  }

  const listarTarefas =()=>{
    axios.get(API_URL,{
      headers:{"x-tenant-id": localStorage.getItem('email_usuario_logado')}
    }).then(response=>{
      const listaDeTarefas =response.data;
      setTarefas(listaDeTarefas);
      console.log(listaDeTarefas);
    }).catch(erro => {
      setMensagem('Ocorreu um erro', erro);
      setOpenDialog(true);
    })
  }

  const alterarStatus=(id)=>{
    axios.patch(`${API_URL}/${id}`,null,{
      headers:{"x-tenant-id": localStorage.getItem('email_usuario_logado')}
    }).then((response)=>{
        const lista=[...tarefas];
        lista.forEach(tarefa=>{
          if(tarefa.id===id){
            tarefa.done=true;
          }          
        });
        setTarefas(lista);
        setMensagem("Item Atualizado com sucesso!");
        setOpenDialog(true);
    }).catch(erro => {
      setMensagem('Ocorreu um erro', erro);
      setOpenDialog(true);
    })
  }

  const deletarTarefa=(id)=>{
    axios.delete(`${API_URL}/${id}`,{
      headers:{"x-tenant-id": localStorage.getItem('email_usuario_logado')}
    }).then(response=>{
       const lista =tarefas.filter(tarefa=> tarefa.id!==id);
       setTarefas(lista);
       setMensagem("Item Removido com sucesso!");
       setOpenDialog(true);
    }).catch(erro => {
      setMensagem('Ocorreu um erro', erro);
      setOpenDialog(true);
    })
  }

  useEffect(()=>{
    listarTarefas();
  },[]);

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar} />
      <div className={classes.content}>
        <TarefasTable tarefas={tarefas} alterarStatus={alterarStatus}
        deleteAction={deletarTarefa} />
      </div>
      <Dialog open={openDialog}  onClose={event=>setOpenDialog(false)}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>
          {mensagem}
        </DialogContent>
        <DialogActions>
          <Button onClick={event=>setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TarefaList;
