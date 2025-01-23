import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://digitalcommerce-backend.onrender.com/profile',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => `/`
        }),
        loginProfile: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: 'post',
                body
            })
        }),
        addProfile: builder.mutation({
            query: (body) => ({
                url: '/sign_up',
                method: 'post',
                body
            })
        }),
        updateProfile: builder.mutation({
            query: ({usernameOrg,body}) => ({
                url: `/update/${usernameOrg}`,
                method: 'put',
                body
            })
        }),
        deleteProfile: builder.mutation({
            query: ({username}) => ({
                url: `/delete/${username}`,
                method: 'delete'
            })
        }),
        addProfileAvatar: builder.mutation({
            query: (body) => ({
                url: '/upload/avatar',
                method: 'post',
                body
            })
        }),
    })
})

export const {useGetProfileQuery,useLoginProfileMutation,useAddProfileMutation,
    useUpdateProfileMutation,useDeleteProfileMutation,useAddProfileAvatarMutation} = profileApi