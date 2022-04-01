import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { SearchOutlined } from '@hi-ui/icons'
import Highlighter from '@hi-ui/highlighter'
import { Input, Message } from '@hi-ui/hiui'
import './searchbox.scss'

const SuggestList = [
  '小米12 什么时候发售',
  'Redmi K50 使用的是什么CPU',
  '小米12 最大内存多少',
  'Redmi Book Pro 15 值得买么',
  'Redmi K50 测评',
]

export const SearchBox: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const activeRef = useRef<boolean>(false)
  const [ searchActive, setSearchActive ] = useState<boolean>(false)
  const [ searchQuery, setSearchQuery ] = useState<string>("")
  const [ searchSuggestions, setSearchSuggestions ] = useState<string[]>([])

  useEffect(() => {
    window.addEventListener('mousedown', handleWindowClick)
    return () => {
      window.removeEventListener('mousedown', handleWindowClick)
    }
  }, [])

  const handleWindowClick = (event: any) => {
    if (!activeRef.current) return
    const { current } = containerRef;
    if (event.target === window || (current && !current.contains(event.target))) {
      setSearchActive(false)
      activeRef.current = false
    }
  }

  const handleSearchBtnClick = () => {
    if (!searchActive) {
      setSearchActive(true)
      activeRef.current = true
      inputRef.current && inputRef.current.focus()
    } else {
      handleSearch()
    }
  }

  const handleQueryChange = (evt: React.ChangeEvent<HTMLInputElement>, value: string) => {
    const query = value
    const suggestions = []
    if (query && query.trim()) {
      const trimQuery = query.trim()
      for (let index = 0; index < SuggestList.length; index++) {
        if (SuggestList[index].indexOf(trimQuery) !== -1 && SuggestList[index] !== trimQuery) {
          suggestions.push(SuggestList[index])
        }
      }
    }
    setSearchQuery(value)
    setSearchSuggestions(suggestions)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event?.keyCode === 13) {
      handleSearch()
    }
  }

  const handleSearch = (query?: string) => {
    let currentQuery = query ? query.trim() : searchQuery.trim();
    if (currentQuery) {
      Message.open({
        title: '搜索：' + currentQuery,
        type: 'success',
      })
      setSearchQuery("")
      setSearchSuggestions([])
      setSearchActive(false)
      activeRef.current = false
    }
  }

  const renderSuggestion = () => {
    const nodeList = []
    for (let index = 0; index < searchSuggestions.length; index++) {
      const content = searchSuggestions[index]
      nodeList.push(
        <Highlighter
          className="searchresult-item"
          key={content}
          keyword={searchQuery}
          onClick={() => {
            setTimeout(() => {
              handleSearch(content)
            }, 100)
          }}
        >{content}</Highlighter>
      )
    }
    return nodeList
  }

  return  (
    <div
      className={'hi-pro-header__searchbox ' + (searchActive ? 'active' : '')}
      ref={containerRef}
    >
      <div className="headicon" onClick={handleSearchBtnClick}>
        <SearchOutlined style={{ fontSize: 20, color: '5F6A7A', zIndex: 2 }} />
      </div>
      <Input ref={inputRef} value={searchQuery} className="input" onChange={handleQueryChange} onKeyDown={handleKeyDown} />
      <div className={'searchresult ' + (searchSuggestions.length > 0 ? 'active' : '')}>
        {renderSuggestion()}
      </div>
    </div>
  )
}