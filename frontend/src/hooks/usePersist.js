import { useState, useEffect } from "react"

const usePersist = () => {
  const [persist, setSersist] = useState(JSON.parse(localStorage.getItem("persist")) || false)

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist))
  }, [persist])
  
  return []
}

export default usePersist
