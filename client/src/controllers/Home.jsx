import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className="heroContainer">
        <div className="hero-sub-container">
            <h1>Welcome to Task Management System</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Consequuntur reiciendis voluptatibus quam dolor incidunt nesciunt?
                Doloribus sunt deleniti labore harum repellendus illum nulla 
                rem cum amet consectetur non, cupiditate iusto!
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptate quidem possimus quo dignissimos fugit eos ut aspernatur adipisci nobis, facilis sint eius ducimus ullam nihil quos hic? Accusantium, exercitationem?
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quo, nobis, provident odio unde quas illum vitae, voluptas error sapiente blanditiis distinctio dolore praesentium voluptatum modi? Minus aut qui ratione?
            </p>
            <div className="go-btn-container">
                <Link to="/login">
                    <button className="btn btn-primary login-go-btn">
                        Login
                    </button>
                </Link>

                <Link to="/register">
                    <button className="btn btn-dark register-go-btn" >
                        Register                      
                    </button>
                </Link>
                
            </div>
        </div>
    </div>
  )
}

export default Home;