"use client"
import axios from "axios"
import { useState, useEffect } from "react"


export const useGetUser = () => {

  const [user, setUser] = useState()


  useEffect(() => {
    axios.get("http://localhost:9000/user/").then((response) => {
      setUser(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  const handleRequestUser = () => {
    axios.get("http://localhost:9000/user/").then((response) => {
      setUser(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }


  return {
    user,
    handleRequestUser
  }
}