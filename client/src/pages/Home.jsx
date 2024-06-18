
import Header from "../components/Header"


function Home() {


  return (
    <div>
       <Header/>
       <div className="flex justify-center items-center h-screen" style={{ backgroundImage: 'url("https://img.freepik.com/premium-vector/abstract-blue-white-technology-background-modern-vector-illustration-design_29865-4558.jpg?w=2000")' }}>
      <p className="text-center font-bold text-4xl text-slate-700"  >Welcome to my MERN User Management app
       </p>
    </div>
    </div>
  )
}

export default Home
