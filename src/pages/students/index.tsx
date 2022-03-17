import { FC, useEffect, useState } from 'react';

import { Button, message } from 'antd';
import {
  connect,
  Dispatch,
  history,
  Loading,
  Student,
  StudentModelState,
} from 'umi';
import ProTable, { ProColumns } from '@ant-design/pro-table';

import { getLocalStorage, setLocalStorage } from '@/utils/storage';

import { CoursesModal } from './components/student.modal';

export interface StudentPageProps {
  state: StudentModelState;
  dispatch: Dispatch;
  loading: boolean;
}

const StudentListPage: FC<StudentPageProps> = ({
  state,
  dispatch,
  loading,
}) => {
  useEffect(() => {
    getRecord(1, 5);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const {
    result: {
      data: students,
      meta: { page: pageIndex, pageSize: pageSize, total },
    },
  } = state;

  const columns: ProColumns<Student>[] = [
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
      title: '老师',
      dataIndex: 'teacherName',
      key: 'teacherName',
      valueType: 'text',
    },
    {
      title: '得分',
      dataIndex: 'score',
      key: 'score',
      valueType: 'digit',
    },
    // {
    //   title: '更新时间',
    //   dataIndex: 'updateTime',
    //   valueType: 'date',
    //   key: 'updateTime',
    // },
  ];

  const getRecord = (index?: number, size?: number) => {
    dispatch({
      type: 'students/getRecord',
      data: { page: index || pageIndex, pageSize: size || pageSize },
    });
    return undefined;
  };

  const add = () => {
    setModalVisible(true);
  };

  const addRecord = (courseId: number) => {
    setConfirmLoading(true);
    dispatch({
      type: 'students/addRecord',
      courseId,
      callback: (res) => {
        if (res) {
          setConfirmLoading(false);
          setModalVisible(false);
          message.success(`选课成功.`);
          getRecord(pageIndex, pageSize);
        } else {
          setConfirmLoading(false);
          message.error(`选课失败.`);
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
        dataSource={students}
        loading={loading}
        rowKey="id"
        search={false}
        // pagination={false}
        pagination={{
          pageSize: 5,
          showQuickJumper: true,
        }}
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
        }同学的课程表`}
        toolBarRender={() => [
          <Button type="primary" onClick={add}>
            选课
          </Button>,
          <Button onClick={() => getRecord()}>刷新</Button>,
          <Button type="dashed" danger onClick={logout}>
            退出
          </Button>,
        ]}
      />
      {/* <Pagination
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
      /> */}
      <CoursesModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        confirmLoading={confirmLoading}
        addRecord={addRecord}
        records={students.map((students) => students.name)}
      />
    </div>
  );
};

// 简写
const mapStateToProps = ({
  students: state,
  loading,
}: {
  students: StudentModelState;
  loading: Loading;
}) => ({ state, loading: loading.models.students });

export default connect(mapStateToProps)(StudentListPage);
