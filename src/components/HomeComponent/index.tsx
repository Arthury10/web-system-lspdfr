export const HomeComponent = () => {
  const policeName = "Arthur Ropke"
  return (
    <div className="container bg-slate-500 flex flex-col gap-10 m-auto p-6 my-6 rounded">
      <h1>Olá seja bem vindo {policeName}</h1>
    </div>
  )
}