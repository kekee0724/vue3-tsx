import { FC, useEffect, useState } from 'react';

import { Button, message, Pagination, Popconfirm } from 'antd';
import {
  Achieve,
  connect,
  Dispatch,
  Loading,
  Teacher,
  TeacherModelState,
  history,
} from 'umi';
import ProTable, { ProColumns } from '@ant-design/pro-table';

import { AchievesModal } from './components/achieve.modal';
import { CoursesModal } from './components/teacher.modal';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';

export interface TeacherPageProps {
  state: TeacherModelState;
  dispatch: Dispatch;
  loading: boolean;
}

const TeacherListPage: FC<TeacherPageProps> = ({
  state,
  dispatch,
  loading,
}) => {
  useEffect(() => {
    getRecord(1, 5);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalAchieveVisible, setAchieveModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [record, setRecord] = useState<Partial<Teacher>>({});
  const [achieve, setAchieve] = useState<Array<Achieve>>([]);

  const {
    result: {
      data: teachers,
      meta: { page: pageIndex, pageSize: pageSize, total },
    },
  } = state;

  const columns: ProColumns<Teacher>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      valueType: 'digit',
      key: 'id',
    },
    {
      title: '课程名',
      dataIndex: 'name',
      key: 'name',
      valueType: 'text',
      // render: (text: React.ReactNode) => <a>{text}</a>,
    },
    {
      title: '学时',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: '选课学生',
      dataIndex: 'achieve',
      key: 'achieve',
      valueType: 'text',
      render: (text: Array<Achieve>) => (
        <a onClick={() => showAchieve(text)}>
          {text.map((item: any) => item.student).join(',')}
        </a>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'date',
      key: 'updateTime',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (_, record: Teacher) => [
        <a key="0" onClick={() => edit(record)}>
          编辑 {record.name}
        </a>,
        <Popconfirm
          key="1"
          title="确认删除这个课程吗?"
          onConfirm={() => {
            remove(record.id);
          }}
          okText="确定"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getRecord = (index?: number, size?: number) => {
    dispatch({
      type: 'teachers/getRecord',
      data: { page: index || pageIndex, pageSize: size || pageSize },
    });
    return undefined;
  };

  const edit = (record: Teacher) => {
    setModalVisible(true);
    setRecord(record);
  };

  const showAchieve = (achieve: Array<Achieve>) => {
    setAchieveModalVisible(true);
    setAchieve(achieve);
  };

  const remove = (id: number) => {
    dispatch({
      type: 'teachers/deleteRecord',
      data: {
        id,
      },
      callback: (res) => {
        console.log('删除', res);
        if (res) {
          message.success('删除成功.');
          getRecord(pageIndex, pageSize);
        } else {
          message.error('删除失败.');
        }
      },
    });
  };

  const add = () => {
    setModalVisible(true);
    setRecord({});
  };

  const onFinish = (values: Partial<Teacher>) => {
    setConfirmLoading(true);
    const { id } = record;

    let type;
    if (id) {
      type = 'teachers/editRecord';
    } else {
      type = 'teachers/addRecord';
    }

    dispatch({
      type,
      data: { id, ...values },
      callback: (res) => {
        if (res) {
          setConfirmLoading(false);
          setModalVisible(false);
          message.success(`${id === 0 ? '新增' : '编辑'}成功.`);
          getRecord(pageIndex, pageSize);
        } else {
          setConfirmLoading(false);
          message.error(`${id === 0 ? '新增' : '编辑'}失败.`);
        }
      },
    });
  };

  const logout = () => {
    setLocalStorage('authsessiontoken', '');
    history.push('/login');
  };

  return (
    <div className="list-table">
      <ProTable
        columns={columns}
        dataSource={teachers}
        loading={loading}
        rowKey="id"
        search={false}
        pagination={false}
        options={{
          density: true,
          fullScreen: true,
          reload: () => {
            getRecord(pageIndex, pageSize);
          },
          setting: true,
        }}
        headerTitle={`${
          JSON.parse(getLocalStorage('authsessiontoken')).name
        }老师的课程列表`}
        toolBarRender={() => [
          <Button type="primary" onClick={add}>
            新增
          </Button>,
          <Button onClick={() => getRecord()}>刷新</Button>,
          <Button type="dashed" danger onClick={logout}>
            退出
          </Button>,
        ]}
      />
      <Pagination
        className="list-page"
        total={total}
        onChange={(pageIndex, pageSize) => getRecord(pageIndex, pageSize)}
        onShowSizeChange={(pageIndex, pageSize) =>
          getRecord(pageIndex, pageSize)
        }
        current={pageIndex}
        pageSize={pageSize}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `共 ${total} 条记录`}
      />
      <CoursesModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        record={record}
        onFinish={onFinish}
        confirmLoading={confirmLoading}
      />
      <AchievesModal
        visible={modalAchieveVisible}
        onCancel={() => setAchieveModalVisible(false)}
        record={achieve}
        dispatch={dispatch}
        // onFinish={onFinish}
        // confirmLoading={confirmLoading}
      />
    </div>
  );
};

// 简写
const mapStateToProps = ({
  teachers: state,
  loading,
}: {
  teachers: TeacherModelState;
  loading: Loading;
}) => ({ state, loading: loading.models.teachers });

export default connect(mapStateToProps)(TeacherListPage);
