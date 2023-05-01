import axios from "axios"
import { toast } from "react-toastify"
import { FaTrash, FaEdit } from "react-icons/fa"

export const Grid = ({ users, setUsers, setOnEdit }) => {

    const handleDeleteUser = async (id) => {
        await axios
            .delete(`http://localhost:3333/${id}`)
            .then(({data}) => {
                const novoArrayDeUsuarios = users.filter((user) => user.id !== id)

                setUsers(novoArrayDeUsuarios)
                toast.success(data)
            })
            .catch(({data}) => toast.error(data))

        setOnEdit(null)
    }

    const handleEdit = (item) => {
        setOnEdit(item)
    }

    return (
        <table className="w-full bg-gray-400 p-5 rounded-md m-5 break-all max-w-3xl">
            <thead>
                <tr>
                    <th className="text-start pb-1">Nome</th>
                    <th className="text-start pb-1">Email</th>
                    <th className="text-start pb-1">Telefone</th>
                    <th className="text-start pb-1">Data de nascimento</th>
                    <th className="text-start pb-1"></th>
                    <th className="text-start pb-1"></th>
                </tr>
            </thead>
            <tbody>
                {users.map((item) => {
                    return <tr key={item.id}>
                        <td className="pt-4 text-start text-white">{item.nome}</td>
                        <td className="pt-4 text-start text-white">{item.email}</td>
                        <td className="pt-4 text-start text-white">{item.telefone}</td>
                        <td className="pt-4 text-start text-white">{item.data_nascimento}</td>
                        <td className="pt-4 items-center text-white">
                            <FaEdit onClick={() => handleEdit(item)}/>
                        </td>
                        <td className="pt-4 items-center text-white">
                            <FaTrash onClick={() => handleDeleteUser(item.id)}/>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}