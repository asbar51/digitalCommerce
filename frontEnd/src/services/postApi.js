import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/posts',
        credentials: 'include'
}),
    // keepUnusedDataFor:0,
    tagTypes: ['getAllPosts'],
    endpoints: (builder) => ({
        // CRUD
        getAllPosts: builder.query({
            query: (page) => `/page/${page}`
        }),
        getPostsByCategorie: builder.query({
            query: ({page,categorie}) => `/page/${page}/categorie/${categorie}`
        }),
        getPostsBySearch: builder.query({
            query: ({page,categorie,search,minPrice,maxPrice}) => `/page/${page}
            /title/${search}/categorie/${categorie}/minPrice/${minPrice}/maxPrice/${maxPrice}`
        }),
        // getAllPosts: builder.query({
        //     query: ({ page, categorie, title, minPrice, maxPrice }) => {
        //         return `/page/${page}/categorie/${categorie}/title/${title}/minPrice/${minPrice}/maxPrice/${maxPrice}`;
        //     }
        // }),
        
        getStore: builder.query({
            query: (username) => `/store/${username}`
        }),
        getPost: builder.query({
            query: (id) => `/${id}`
        }),
        addPost: builder.mutation({
            query: (body) => ({
                url: '/',
                method: 'post',
                body
            })
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
        }),
        UpdatePost: builder.mutation({
            query: ({id,formData}) => ({
                url: `/${id}`,
                method: 'PUT',
                body : formData
            })
        }),
        addToCart: builder.mutation({
            query: (id) => ({
                url: `/add_to_cart/${id}`,
                method: 'post'
            })
        }),
        getFromCart: builder.query({
            query: () => ({
                url: `/get_from_cart`
            })
        }),
        removeFromCart: builder.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: 'delete'
            })
        }),
        order: builder.mutation({
            query: ({id,body}) => ({
                url: `/order/${id}`,
                method: 'post',
                body
            })
        }),
        getOrders: builder.query({
            query: () => ({
                url: `/get_orders`
            })
        }),
        addReview: builder.mutation({
            query: ({PostId,body}) => ({
                url: `/review/add/${PostId}`,
                method: 'post',
                body
            })
        }),
        updateReview: builder.mutation({
            query: ({PostId,body}) => ({
                url: `/review/update/${PostId}`,
                method: 'post',
                body
            })
        }),
        deleteReview: builder.mutation({
            query: (PostId) => ({
                url: `/review/delete/${PostId}`,
                method: 'post'
            })
        }),
    })
})

export const {useGetAllPostsQuery,useGetPostQuery,useAddPostMutation,useDeletePostMutation,
    useUpdatePostMutation,useGetStoreQuery,useAddToCartMutation,useGetFromCartQuery,
    useRemoveFromCartMutation,useOrderMutation,useGetOrdersQuery,useGetPostsByCategorieQuery,
    useGetPostsBySearchQuery,useAddReviewMutation,useUpdateReviewMutation,useDeleteReviewMutation} = postApi