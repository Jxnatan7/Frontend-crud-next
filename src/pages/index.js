import { Form } from "@/components/Form"
import { Grid } from "@/components/Grid"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function Home() {
  const [users, setUsers] = useState([])
  const [onEdit, setOnEdit] = useState(null)

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3333")
      setUsers(response.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)))
    }
    catch (err) {
      toast.error("Aconteceu o seguinte erro: " + err)
    }
  }

  useEffect(() => {
    getUsers()
  }, [setUsers])

  return (
    <>
      <div className="w-full mt-5 flex flex-col items-center gap-3">
        <h2 className="font-bold">Usuários</h2>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit}/>
      </div>
    </>
  )
}
