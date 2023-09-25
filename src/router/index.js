import PostIdPage from "../pages/PostIdPage"
import Posts from "../pages/Posts"

export const privatRoutes = [    
    {path:'/posts', component: Posts, exact: true},
    {path:'/posts/:id', component: PostIdPage, exact: true},
]

