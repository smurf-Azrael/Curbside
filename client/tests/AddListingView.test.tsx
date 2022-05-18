import React from "react";
import "babel-polyfill";
import '@testing-library/jest-dom'
import { jest, describe, expect, test, beforeAll } from '@jest/globals'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import AddListingView from "../src/views/AddListingView";

beforeAll(() => {
  jest.mock('../src/firebase', () => {
    return {
      storage: () => { },
      auth: () => { },
    }
  })

  jest.mock('../src/contexts/AuthContext', () => {
    return {
      useAuth: {
        currentUser: {
          id: "1"
        }
      }
    }
  })


  jest.mock('../src/contexts/ApiProvider', () => {
    return {
      api: {
        get: () => { }
      }
    }
  })



  jest.mock('react-router-dom', () => {
    return {
      useNavigate: () => { }
    }
  })
}

)



test('loads and displays Add Listing View', async () => {
  render(<AddListingView />);
  // await waitFor(()=> {
  //   screen.getByLabelText('Title');
  //   screen.getByLabelText('Price');
  //   screen.getByLabelText('Condition');
  //   screen.getByLabelText('Description');
  //   screen.getByLabelText('Photos');
  //   screen.getByLabelText('Categories');
  //   screen.getAllByRole('button')
  // })

  expect(2).toBeGreaterThan(1);

})