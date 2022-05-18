import React from "react";
import '@testing-library/jest-dom'
import { jest, describe, expect, test, beforeAll } from '@jest/globals'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AddListingView from "../views/AddListingView";


jest.mock('../firebase', () => {
  return {
    storage: () => { },
    auth: () => { },
  }
})

jest.mock('../contexts/AuthContext', () => {
  return {
    useAuth: () => {
      const currentUser = { 
        id: "1", 
        latitude: 30.30,
        longitude: 13.13
      } 
      return   currentUser 
    }
  }
})


jest.mock('../contexts/ApiProvider', () => {
  return {
    useApi: () => {
      const api = { 
        get: (url, query, options) => {
          console.log(url)
          console.log(query)
        }, 
        post: (url, body) => {
          console.log(url)
          console.log(body)
          return {ok : true}
        }
      } 
      return api
    }
  }
})

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => {
      const navigate = () => {}
      return navigate
    }
  }
})

describe('Add Listing View', ()=>{
  it('loads and displays Add Listing View', async () => {
    render(<AddListingView />);
    
    await waitFor(()=> {
      screen.getByLabelText('Title');
      screen.getByLabelText('Price');
      screen.getByLabelText('Condition');
      screen.getByLabelText('Description');
      screen.getByLabelText('Photos');
      screen.getByLabelText('Categories');
      screen.getAllByRole('button')
    })
  })

  it('displays errors when missing info', async () => {
    render(<AddListingView />);
    const title = screen.getByLabelText(/title/i);
    const price = screen.getByLabelText(/price/i);
    const condition = screen.getByLabelText(/condition/i);
    const categories = screen.getByLabelText(/categories/i);
    const description = screen.getByLabelText(/description/i)
    const photos = screen.getByLabelText(/photos/i)
    const submit = screen.getByRole('button', {name : /create/i})
    
    userEvent.click(submit);
    expect(screen.getByText(/Title is required/i)).toBeTruthy()
    expect(screen.getByText(/Price is required/i)).toBeTruthy()
    expect(screen.getByText(/Description is required/i)).toBeTruthy()
    expect(screen.getByText(/Please upload at least one photo/i)).toBeTruthy()
    expect(screen.getByText(/Please add at least one category/i)).toBeTruthy()
    
    userEvent.type(title, 'Awesome Sauce')
    userEvent.click(submit);
    expect(()=>screen.getByText(/Title is required/i)).toThrowError('Unable to find an element with the text: /Title is required/i')
    
    userEvent.type(categories, 'moto')
    const option = screen.getByText('Motorbikes')
    userEvent.click(option);
    userEvent.click(submit);
    expect(()=>screen.getByText(/Please add at least one category/i)).toThrowError('Unable to find an element with the text: /Please add at least one category/i')
    
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
    fireEvent.change(photos, { target :{ files:file }})
    userEvent.click(submit);
    expect(()=>screen.getByText(/Please upload at least one photo/i)).toThrowError('Unable to find an element with the text: /Please upload at least one photo/i')
  
  
  })

   it('passes the correct query to the api', ()=> {
    render(<AddListingView />);
    const title = screen.getByLabelText(/title/i);
    const price = screen.getByLabelText(/price/i);
    const condition = screen.getByLabelText(/condition/i);
    const categories = screen.getByLabelText(/categories/i);
    const description = screen.getByLabelText(/description/i)
    const photos = screen.getByLabelText(/photos/i)
    const submit = screen.getByRole('button', {name : /create/i})

    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
    fireEvent.change(photos, { target :{ files: file }})

    userEvent.type(title, 'A new thing');
    userEvent.type(price, '42.34');
    userEvent.type(description, 'The Coolest new thing');
    userEvent.selectOptions(condition, screen.getAllByRole('option', {name: 'Gently Used'}));
    userEvent.type(categories, 'moto')
    const option = screen.getByText('Motorbikes')
    userEvent.click(option);
    

    userEvent.click(submit);
    expect(() => screen.getByText(/Title is required/i)).toThrowError('Unable to find an element with the text: /Title is required/i')
    expect(() => screen.getByText(/Price is required/i)).toThrowError('Unable to find an element with the text: /Price is required/i')
    expect(() => screen.getByText(/Description is required/i)).toThrowError('Unable to find an element with the text: /Description is required/i')
    expect(() => screen.getByText(/Please upload at least one photo/i)).toThrowError('Unable to find an element with the text: /Please upload at least one photo/i')
    expect(() => screen.getByText(/Please add at least one category/i)).toThrowError('Unable to find an element with the text: /Please add at least one category/i')

   })


})
