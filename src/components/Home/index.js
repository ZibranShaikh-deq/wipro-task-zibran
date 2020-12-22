import React, { useState, useRef } from 'react'
import { Form } from 'react-bootstrap'
// import AsyncSelect from 'react-select/async';

import Layout from 'common/Layout'
import Texts from 'constants/staticText'
import { getSuggestions } from "service/api"

import './home.css'

const Home = () => {
  const [ suggestions, setSuggestions ] = useState([])
  const [ value, setValue ] = useState("")
  const [ showOptions, setShowOptions ] = useState(false)
  const inputRef = useRef()

  const handleInputChange = (value) => {
    setValue(value)
    handleOnFocus(value)
  }
  
  const handleOnClick = (item) => {
    setShowOptions(false)
    setValue(item+" ")
    inputRef.current.focus()
  }

  const handleOnFocus = async (value) => {
    const options = await getSuggestions(value)
    if(options && options.length > 0){
      setSuggestions(options)
      setShowOptions(true)
    }
  }

  const renderOptions = () => {
    if(showOptions && suggestions && suggestions.length > 0){
      return (
        <div className="option-div">
          {suggestions.map(item => {
              return (
                <option 
                  key={item}
                  className={`option ${item === value ? "highlight-color" : ""}`} 
                  onClick={() => handleOnClick(item)}
                >
                  {item}
                </option>
              )
            })
          }
        </div>
      )
    } 
    return null
  }

  const renderSearchBox = () => {
    return (
      <Form.Group>
        <Form.Label>{Texts.SEARCH}</Form.Label>
        <Form.Control 
          ref={inputRef}
          type="text" 
          autoComplete="off"
          placeholder={Texts.PLACEHOLDER}
          onChange={(event) => handleInputChange(event.target.value)}
          value={value}
          // onBlur={() => setShowOptions(false)}
          onFocus={() => !value && handleOnFocus("t")}
        >
        </Form.Control>
        {renderOptions()}
      </Form.Group>
    )
  }
  
  // const handleLoadOptions = (inputValue, callback) => {
  //   setTimeout(async () => {
  //     const options = await getSuggestions(inputValue)
  //     const optSuggestions = options.map(item => {
  //       return {
  //         label: item,
  //         value: item
  //       }
  //     })
  //     callback(optSuggestions);
  //   }, 1000);
  // };
  
  // const handleSelectInputChange = (e) => {
  //   setValue(e)
  // }

  return (
    <Layout>
      <div className="parent-container">
        <Form >
          {renderSearchBox()}
          {/* <AsyncSelect
            isClearable
            isSearchable
            placeholder={Texts.PLACEHOLDER}
            loadOptions={handleLoadOptions}
            onChange={(e) => handleSelectInputChange(e)}
            value={value}
            autoComplete={false}
            autoFocus={true}
          /> */}
        </Form>
      </div>
      
    </Layout>
  )
}

Home.propTypes = {
}

export default Home
