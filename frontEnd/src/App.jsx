import CreateStepOne from "./components/posts/Create";
import Navebare from "./components/Navebare";
import PostDetails from "./components/posts/PostDetails";
import Update from "./components/posts/Update";
import Posts from "./components/posts/Posts";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from "./components/profile/SignUp";
import Login from "./components/profile/LogIn";
import Setting from "./components/profile/Setting";
import ProfileNav from "./components/profile/ProfileNav";
import StoreProducts from "./components/profile/StoreProducts.jsx";
import MyCart from "./components/profile/MyCart";
import MyOrders from "./components/profile/MyOrders";
import CheckoutPage from "./components/posts/checkoutPage.jsx";
import PostsCategorie from "./components/posts/PostsCategorie.jsx"
import PostSearch from "./components/posts/PostSearch.jsx"


export default function App() {
  return (
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Navebare />}>
        <Route path="/" element={<Posts/>}/>

        <Route path="/categorie/:categorie" element={<PostsCategorie />} >
          <Route path="page/:page" element={<PostsCategorie />} />
        </Route>
        
        <Route path="/search/:search/categorie/:categorie/minPrice/:minPrice/maxPrice/:maxPrice" element={<PostSearch />} >
          <Route path="page/:page" element={<PostSearch />} />
        </Route>

        <Route path="/page/:pageNumber" element={<Posts/>}/>
        <Route path="/create" element={<CreateStepOne/>}/>
        <Route path="/update/:id" element={<Update/>}/>
        <Route path="/posts/:id" element={<PostDetails/>}/>
        <Route path="/profile" element={<ProfileNav/>}/>
        <Route path="/profile/setting" element={<Setting/>}/>
        <Route path="/store/:username" element={<StoreProducts/>}/>
        <Route path="/profile/cart" element={<MyCart/>}/>
        <Route path="/profile/orders" element={<MyOrders/>}/>
        <Route path="/sign_up" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
      </Route>
      
      {/* checkout */}
      <Route path="/checkout/:id/quantity/:quantity/price/:price/:firstName/:lastName/:phoneNumber/:email" element={<CheckoutPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}