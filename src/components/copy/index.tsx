import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Drawer, Button, Tooltip, Notification, Tree, Loading } from '@hi-ui/hiui'
import {
  FileOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  QuestionCircleOutlined,
  ToolOutlined,
} from '@hi-ui/icons'
import { useToggle } from '@hi-ui/hooks'
import './style/index.scss'
import { downloadFiles, getCodesWithImportModules, paths2TreeData } from './utils'
import { Spacer } from '../spacer'
import { visitTree } from '@hi-ui/utils'

const prefix = 'hi-pro-copy'

export const Copy = () => {
  const [drawerVisible, drawerVisibleAction] = useToggle()
  const [sourceTreeData, setSourceTreeData] = React.useState([])
  const [selectedNode, setSelectedNode] = React.useState<any>(null)
  const [expandedIds, setExpandedIds] = React.useState<React.ReactText[]>([])

  const [loading, setLoading] = React.useState(false)

  const codesRef = React.useRef<any>([])

  const showModal = async () => {
    drawerVisibleAction.on()

    // 约定：文件路由 和 前端路由保持一致
    let pathname = window.location.href.split('/').pop()
    if (typeof pathname !== 'string') return
    if (pathname.includes('#')) {
      pathname = pathname.split('#')[0]
    }
    if (!pathname || pathname === '/') {
      return
    }

    setLoading(true)
    const codes = await getCodesWithImportModules(pathname)
    codesRef.current = codes
    console.log('codes', codes)

    if (Array.isArray(codes) && codes.length > 0) {
      setSelectedNode(codes[0])

      let treeData: any = paths2TreeData(codes)

      // 移除顶层只有一层的目录，使结构内容尽量展现
      if (treeData && treeData.length === 1) {
        treeData = treeData[0].children
      }

      const nextExpandedIds = [] as string[]
      visitTree(treeData, (node) => {
        nextExpandedIds.push(node.id)
      })

      setExpandedIds(nextExpandedIds)
      setSourceTreeData(treeData)
      setLoading(false)
    }
  }

  const closeModal = () => {
    drawerVisibleAction.off()
    setSelectedNode(null)
  }

  const onFilePick = React.useCallback((id, node) => {
    if (!node) return

    if (node.raw.raw) {
      setSelectedNode(node.raw)
    } else {
      setExpandedIds((prev) => {
        if (prev.includes(id)) {
          return prev.filter((expandedId) => expandedId !== id)
        }
        return prev.concat(id)
      })
    }
  }, [])

  return (
    <React.Fragment>
      <Tooltip title="获取代码" placement="left">
        <div className={`${prefix}-tool`}>
          <div className={`${prefix}-tool__icon`} onClick={showModal}>
            <ToolOutlined />
          </div>
        </div>
      </Tooltip>
      <Drawer
        className={`${prefix}-drawer`}
        unmountOnClose
        width={900}
        title={
          <Spacer>
            <span>获取代码</span>
            <Tooltip
              placement="bottom-start"
              title={
                <span>
                  <span>点击复制按钮：复制文件代码至你现有的项目中</span>
                  <br />
                  <span>点击下载按钮：下载页面全部代码至你现有的项目中</span>
                </span>
              }
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </Spacer>
        }
        visible={drawerVisible}
        onClose={closeModal}
        footer={[
          <Button type="default" onClick={closeModal} key="close">
            关闭
          </Button>,
          <CopyToClipboard
            text={selectedNode ? selectedNode.raw : ''}
            onCopy={() => {
              Notification.open({
                type: 'success',
                title: '复制成功',
              })
            }}
            key="copy"
          >
            <Button type="primary">复制</Button>
          </CopyToClipboard>,
          <Button
            type="secondary"
            onClick={() => {
              downloadFiles(codesRef.current)
            }}
          >
            下载所有文件
          </Button>,
        ]}
      >
        <Loading visible={loading}>
          <div className={`${prefix}-drawer__body`}>
            <div className={`${prefix}-drawer__sider`}>
              <Tree
                data={sourceTreeData}
                selectedId={selectedNode ? selectedNode.path : ''}
                collapsedIcon={<FolderOutlined />}
                expandedIcon={<FolderOpenOutlined />}
                leafIcon={<FileOutlined />}
                onSelect={onFilePick}
                expandedIds={expandedIds}
                onExpand={setExpandedIds}
              />
            </div>
            <div className={`${prefix}-drawer__main`}>
              {selectedNode ? (
                <SyntaxHighlighter language={selectedNode.ext} style={docco}>
                  {selectedNode.raw}
                </SyntaxHighlighter>
              ) : null}
            </div>
          </div>
        </Loading>
      </Drawer>
    </React.Fragment>
  )
}
