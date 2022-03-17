import { FC, useEffect, useState } from 'react';

import { Button, message } from 'antd';
import {
  connect,
  Dispatch,
  history,
  Loading,
  StudentModelState,
  StudentSchedule,
} from 'umi';
import ProTable, { ProColumns } from '@ant-design/pro-table';

import { getLocalStorage, setLocalStorage } from '@/utils/storage';

import { CourseSelection } from './components/course.selection.modal';

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
    getSchedules(1, 5);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const {
    result: {
      data: studentSchedules,
      meta: { page: pageIndex, pageSize: pageSize, total },
    },
  } = state;

  const columns: ProColumns<StudentSchedule>[] = [
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

  const getSchedules = (index?: number, size?: number) => {
    dispatch({
      type: 'students/getSchedules',
      data: { page: index || pageIndex, pageSize: size || pageSize },
    });
    return undefined;
  };

  const add = () => {
    setModalVisible(true);
  };

  const addSchedule = (courseId: number) => {
    setConfirmLoading(true);
    dispatch({
      type: 'students/addSchedule',
      data: courseId,
      callback: (res) => {
        if (res) {
          setConfirmLoading(false);
          setModalVisible(false);
          message.success(`选课成功.`);
          getSchedules(pageIndex, pageSize);
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
        dataSource={studentSchedules}
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
            getSchedules(pageIndex, pageSize);
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
          <Button onClick={() => getSchedules()}>刷新</Button>,
          <Button type="dashed" danger onClick={logout}>
            退出
          </Button>,
        ]}
      />
      <CourseSelection
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        confirmLoading={confirmLoading}
        addSchedule={addSchedule}
        records={studentSchedules.map((stud) => stud.name)}
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
