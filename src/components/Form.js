import { useRef, useState, useEffect } from "react"
import InputMask from 'react-input-mask'
import axios from "axios"
import { toast } from "react-toastify"

export const Form = ({ onEdit, getUsers, setOnEdit }) => {

    const [dataNascimento, setDataNascimento] = useState('');

    const handleDataChange = (event) => {
        setDataNascimento(event.target.value);
    }

    const [telefone, setTelefone] = useState('');

    const handleTelefone= (event) => {
        setTelefone(event.target.value);
    }

    const ref = useRef()

    useEffect(() => {
        if (onEdit) {
          const user = ref.current;
    
          user.nome.value = onEdit.nome;
          user.email.value = onEdit.email;
          user.telefone.value = onEdit.telefone;
          user.data_nascimento.value = onEdit.data_nascimento;
        }
      }, [onEdit]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const user = ref.current;
    
        if (
          !user.nome.value ||
          !user.email.value ||
          !user.telefone.value ||
          !user.data_nascimento.value
        ) {
          return toast.warn("Preencha todos os campos!");
        }
    
        if (onEdit) {
          await axios
            .put("http://localhost:3333/" + onEdit.id, {
              nome: user.nome.value,
              email: user.email.value,
              telefone: user.telefone.value,
              data_nascimento: user.data_nascimento.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        } else {
          await axios
            .post("http://localhost:3333", {
              nome: user.nome.value,
              email: user.email.value,
              telefone: user.telefone.value,
              data_nascimento: user.data_nascimento.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }
    
        user.nome.value = "";
        user.email.value = "";
        user.telefone.value = "";
        user.data_nascimento.value = "";
    
        setOnEdit(null);
        getUsers();
    }

    return (
            <form onSubmit={handleSubmit} className="flex max-w-3xl items-center gap-3 flex-wrap bg-gray-400 p-5 rounded-md" ref={ref}>
                <div className="flex flex-col">
                    <label>Nome</label>
                    <input type="text" className="w-29 px-1 border border-solid border-gray-300 rounded h-10" name="nome"/>
                </div>
                <div className="flex flex-col">
                    <label>Email</label>
                    <input type="text" className="w-29 px-1 border border-solid border-gray-300 rounded h-10" name="email"/>
                </div>
                <div className="flex flex-col">
                    <label>Telefone</label>
                    <InputMask
                        mask="(99) 99999-9999"
                        name="telefone"
                        value={telefone}
                        onChange={handleTelefone}
                    />
                </div>
                <div className="flex flex-col">
                    <label>Data de nascimento</label>
                    <InputMask
                        mask="99/99/9999"
                        name="data_nascimento"
                        value={dataNascimento}
                        onChange={handleDataChange}
                    />
                </div>
                <div className="flex flex-col">
                    <div>‎ </div>
                    <button type="submit" className="bg-white hover:scale-110 hover:bg-gray-700 text-gray-800 hover:transition duration-300 hover:text-white py-2 px-4 rounded">
                        Cadastrar
                    </button>
                </div>
            </form>
    )
}