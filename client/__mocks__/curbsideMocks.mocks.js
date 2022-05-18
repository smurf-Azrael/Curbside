module.exports = {

  useApi: jest.mock('../src/contexts/ApiProvider', ()=>{
    return { 
      api:{
        get: jest.fn(),
      }
    }
  }),

  useAuth: jest.mock('../src/contexts/AuthContext', ()=>{
    return {
      useAuth: {
        currentUser: {
          id:"1"
        }
      }
    }
  }),

  useNavigate: jest.mock('react-router-dom', ()=>{
    return {
      useNavigate: jest.fn()
    }
  }),

  storage: jest.mock('../src/firebase', ()=>{
    return { storage: jest.fn() }
  })

}