import './Main.css'

export const Main = (props: any) => {

  return (
    <main className="page-main">
      {props.children}
    </main>
  )
}
