import React, { useState, useRef, useEffect } from 'react'
import { Form } from 'react-bootstrap'

import Texts from 'constants/staticText'
import { getSuggestions } from "service/api"

import './index.css'

const Search = () => {
  const [ suggestions, setSuggestions ] = useState([])
  const [ value, setValue ] = useState("")
  const [ showOptions, setShowOptions ] = useState(false)
  const inputRef = useRef()
  const node = useRef();
  
  const handleClick = e => {
    if (!node.current.contains(e.target)) {
      console.log("outside click")
      setShowOptions(false)
    }
  };

  useEffect(() => {
    // add when mounted
      document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  let searchValueArray = value.split(" ")
  const lastWord = searchValueArray[searchValueArray.length - 1]

  const handleInputChange = (value) => {
    setValue(value)
    handleOnFocus(value)
  }
  
  const handleOnClick = (item) => {
    let searchValueArray = value.split(" ")
    searchValueArray[searchValueArray.length - 1] = item
    let finalValue = searchValueArray.toString().replace(/,/g, " ")
    setShowOptions(false)
    setValue(finalValue+" ")
    inputRef.current.focus()
  }

  const handleOnFocus = async (value) => {
    const searchValueArray = value.split(" ")
    const options = await getSuggestions(searchValueArray[searchValueArray.length - 1])
    if(options && options.length > 0){
      setSuggestions(options)
      setShowOptions(true)
    }
  }

  const renderOptions = () => {
    if(showOptions && suggestions && suggestions.length > 0){
      // const searchValueArray = value.split(" ")
      return (
        <div className="option-div">
          {suggestions.map(item => {
              return (
                <option 
                  key={item}
                  className={`option ${item === lastWord ? "highlight-color" : ""}`} 
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
        <div ref={node}>
          <Form.Control 
            ref={inputRef}
            type="text" 
            autoComplete="off"
            placeholder={Texts.PLACEHOLDER}
            onChange={(event) => handleInputChange(event.target.value)}
            value={value}
            onFocus={() => handleOnFocus(lastWord)}
          >
          </Form.Control>
          {renderOptions()}
        </div>
      </Form.Group>
    )
  }

  return (
    <div className="parent-container">
			<Form >
				{renderSearchBox()}
			</Form>
    </div>
  )
}

Search.propTypes = {
}

export default Search
