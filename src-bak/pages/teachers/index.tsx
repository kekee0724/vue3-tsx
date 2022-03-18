import { FC, useEffect, useState } from 'react';

import { Button, message, Pagination, Popconfirm } from 'antd';
import {
  Achieve,
  connect,
  Dispatch,
  history,
  Loading,
  TeacherModelState,
  TeacherSchedule,
} from 'umi';
import ProTable, { ProColumns } from '@ant-design/pro-table';

import { getLocalStorage, setLocalStorage } from '@/utils/storage';

import { CourseAddModal } from './components/course.add.modal';
import { StudScoreInfoModal } from './components/stud.score.info.modal';

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
    getSchedules(1, 5);
  }, []);

  const [courseAddVisible, setCourseAddVisible] = useState(false);
  const [scoreInfoVisible, setScoreInfoVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [teacherSchedule, setTeacherSchedule] = useState<
    Partial<TeacherSchedule>
  >({});
  const [achieve, setAchieve] = useState<Array<Achieve>>([]);

  const {
    result: {
      data: teachers,
      meta: { page: pageIndex, pageSize: pageSize, total },
    },
  } = state;

  const columns: ProColumns<TeacherSchedule>[] = [
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
      render: (text: any) => (
        <a onClick={() => showScoreInfo(text)}>
          {text.map((item: Achieve) => item.student).join(',')}
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
      title: '启用',
      dataIndex: 'isValid',
      valueType: 'switch',
      key: 'isValid',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (_, teacherSchedule: TeacherSchedule) => [
        <a key="0" onClick={() => edit(teacherSchedule)}>
          编辑 {teacherSchedule.name}
        </a>,
        <Popconfirm
          key="1"
          title="确认删除这个课程吗?"
          onConfirm={() => {
            remove(teacherSchedule.id);
          }}
          okText="确定"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getSchedules = (index?: number, size?: number) => {
    dispatch({
      type: 'teachers/getSchedules',
      data: { page: index || pageIndex, pageSize: size || pageSize },
    });
    return undefined;
  };

  const edit = (teacherSchedule: TeacherSchedule) => {
    setCourseAddVisible(true);
    setTeacherSchedule(teacherSchedule);
  };

  const showScoreInfo = (achieve: Array<Achieve>) => {
    setScoreInfoVisible(true);
    setAchieve(achieve);
  };

  const remove = (id: number) => {
    dispatch({
      type: 'teachers/delCourse',
      data: {
        id,
      },
      callback: (res) => {
        console.log('删除', res);
        if (res) {
          message.success('删除成功.');
          getSchedules(pageIndex, pageSize);
        } else {
          message.error('删除失败.');
        }
      },
    });
  };

  const add = () => {
    setCourseAddVisible(true);
    setTeacherSchedule({});
  };

  const onFinish = (values: Partial<TeacherSchedule>) => {
    setConfirmLoading(true);
    const { id } = teacherSchedule;

    let type;
    if (id) {
      type = 'teachers/editCourse';
    } else {
      type = 'teachers/addCourse';
    }

    dispatch({
      type,
      data: { id, ...values },
      callback: (res) => {
        if (res) {
          setConfirmLoading(false);
          setCourseAddVisible(false);
          message.success(`${id === 0 ? '新增' : '编辑'}成功.`);
          getSchedules(pageIndex, pageSize);
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
            getSchedules(pageIndex, pageSize);
          },
          setting: true,
        }}
        headerTitle={`${
          JSON.parse(getLocalStorage('authsessiontoken')).name
        }老师任课安排表`}
        toolBarRender={() => [
          <Button type="primary" onClick={add}>
            新增
          </Button>,
          <Button onClick={() => getSchedules()}>刷新</Button>,
          <Button type="dashed" danger onClick={logout}>
            退出
          </Button>,
        ]}
      />
      <Pagination
        className="list-page"
        total={total}
        onChange={(pageIndex, pageSize) => getSchedules(pageIndex, pageSize)}
        onShowSizeChange={(pageIndex, pageSize) =>
          getSchedules(pageIndex, pageSize)
        }
        current={pageIndex}
        pageSize={pageSize}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `共 ${total} 条记录`}
      />
      <CourseAddModal
        visible={courseAddVisible}
        onCancel={() => setCourseAddVisible(false)}
        record={teacherSchedule}
        onFinish={onFinish}
        confirmLoading={confirmLoading}
      />
      <StudScoreInfoModal
        visible={scoreInfoVisible}
        onCancel={() => {
          setScoreInfoVisible(false);
          getSchedules(pageIndex, pageSize);
        }}
        record={achieve}
        dispatch={dispatch}
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
