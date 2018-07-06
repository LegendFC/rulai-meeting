import { Table } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { InjectClass } from '@/utils/HOC'
import { RestClient } from '@/utils/HOC'
import { getAccountList, removeAccount } from '../services/AccountList'

const columns = ({ handleResult }) => [
  { title: '用户ID', dataIndex: 'id', key: 'id' },
  { title: '用户名', dataIndex: 'userName', key: 'name' },
  {
    title: '权限',
    dataIndex: 'root',
    key: 'root',
    render: (text, record) => (
      <React.Fragment>
        {record.root ? <span>root</span> : <span>organization</span>}
      </React.Fragment>
    )
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <React.Fragment>
        {!record.root ? (
          <React.Fragment>
            <a
              style={{ color: 'red' }}
              onClick={() => {
                removeAccount(record.id)
                window.location.reload()
              }}
            >
              删除
            </a>
            {/* <Divider type="vertical" /> */}
          </React.Fragment>
        ) : null}
      </React.Fragment>
    )
  }
]

const T = styled(InjectClass(Table))`
  margin: 12px 0;
  & .ant-table-thead > tr > th {
    background: transparent;
  }
`

class AccountList extends React.Component {
  state = {
    visible: false,
    current: {}
  }
  handleResult = result => {
    this.setState({ visible: true, current: result })
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }
  render() {
    const { loading, data } = this.props
    //const { visible } = this.state
    console.info(data)
    return (
      <React.Fragment>
        {!loading && (
          <T
            pagination={false}
            columns={columns({ handleResult: this.handleResult })}
            dataSource={data.adminList.items}
            rowKey="id"
            {...this.props}
          />
        )}
      </React.Fragment>
    )
  }
}

export default RestClient(getAccountList)(AccountList)
