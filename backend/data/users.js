import bcryptjs from 'bcryptjs'
const users = [
    {
        name:'Admin User',
        email:'admin@example.com',
        password:bcryptjs.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'John Doe',
        email:'john@example.com',
        password:bcryptjs.hashSync('123456',10),
    },
    {
        name:'Admin User',
        email:'jane@example.com',
        password:bcryptjs.hashSync('123456',10),
    }
]

export default users