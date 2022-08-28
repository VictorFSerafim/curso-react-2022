import React,{FC} from "react";
import { Contato } from "./contato";

import {ContatosForm}  from "./Form";
import { ContatosList } from "./List";
import { useContatosLogic } from "./useContatosLogic";

export const Contatos: FC =()=>{

   const {addContato, contato, contatosList, removeContato} =useContatosLogic();

   const handleFormSubmit = (contato:Contato)=>{     
      addContato(contato);
   }

     return (
        <>
           <ContatosForm contato={contato} submeterFormulario={handleFormSubmit}/>
           <ContatosList list={contatosList} onDelete={removeContato}
           />
        </>
     )
}