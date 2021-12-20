import { Checkbox, Menu, Select } from 'antd';
import { FC, ComponentProps, useState, useEffect, useCallback } from 'react';
import type { CascaderOptionType } from 'antd/lib/cascader/index';
import SubMenu from 'antd/lib/menu/SubMenu';
import type { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { cloneDeep } from 'lodash';
import './index.less';
import { SelectValue } from 'antd/lib/select';
// import { SelectProps } from 'antd/lib/select';

type MultiCascaderProps = Overwrite<
  ComponentProps<typeof Select>,
  {
    options: CascaderOptionType[];
    value?: any;
  }
>;

export const MultiCascader: FC<MultiCascaderProps> = props => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(
    Array.isArray(props.value) ? props.value : (props.value?.split(',') || []).filter((n: string) => n)
  );
  const [myOptions] = useState(cloneDeep(props.options));

  console.log('myOptions', myOptions);

  // 设置选中父节点
  const setParentChecked = useCallback((target: CascaderOptionType) => {
    const children = target?.children;
    const length = children?.length;
    // 如果子节点全选了的话
    const isCheckedAll = !!length && children?.every((item: any) => item.checked);
    // 如果是选中了部份
    const isSomeChecked = !!length && children?.some((item: any) => item.checked || item.indeterminate);
    target.checked = isCheckedAll;
    target.indeterminate = isCheckedAll ? false : isSomeChecked;
    if (target.parent) {
      setParentChecked(target.parent);
    }
  }, []);
  // 勾选末节点时触发
  const onChange = (e: any, item: CascaderOptionType, keyPath: string) => {
    const isChecked = e.target.checked;
    item.checked = isChecked;
    setParentChecked(item.parent);
    // setMyOptions([...myOptions]);
    const childrenKeys = getChildrenKeys(myOptions);
    setCheckedList(childrenKeys);
    console.log('childrenKeys', childrenKeys);
    console.log('checked = ', isChecked);
  };
  // 获取子节点的值
  const getChildrenKeys = (children: CascaderOptionType[], arr: CheckboxValueType[] = []): CheckboxValueType[] => {
    return (
      children?.reduce((prev: CheckboxValueType[], curr) => {
        if (curr.children?.length) {
          getChildrenKeys(curr.children, prev);
        } else if (curr.checked) {
          prev.push(curr.keyPath);
        }
        return prev;
      }, arr) || []
    );
  };

  // 切换子节点选中状态
  const toggleChildrenChecked = (children: CascaderOptionType[], checked = false) => {
    children?.forEach(item => {
      item.checked = checked;
      item.indeterminate = false;
      if (item.children?.length) {
        toggleChildrenChecked(item.children, checked);
      }
    });
  };

  const onCheckAllChange = (e: any, item: CascaderOptionType, keyPath: string) => {
    // console.log('onCheckAllChange', item, keyPath);
    const isChecked = e.target.checked;
    item.indeterminate = false;
    item.checked = isChecked;
    console.log('item', item);
    item.children && toggleChildrenChecked(item.children, isChecked);
    item.parent && setParentChecked(item.parent);
    // setMyOptions([...myOptions]);
    const childrenKeys = getChildrenKeys(myOptions);
    console.log('childrenKeys', childrenKeys);
    setCheckedList(childrenKeys);
  };

  useEffect(() => {
    // 根据输入框选中的内容更新级联树
    const updateChildrenChecked = (options = myOptions) => {
      options.forEach((item: any) => {
        if (item.children?.length) {
          updateChildrenChecked(item.children);
        } else {
          item.checked = checkedList.includes(item.keyPath);
          if (!item.checked) {
            setParentChecked(item.parent);
          }
        }
      });
    };
    updateChildrenChecked();
    // eslint-disable-next-line
  }, [checkedList]);

  // 选择器标签取消选中
  const onDeselect = (val: string) => {
    setCheckedList(checkedList.filter(item => item !== val));
  };
  // 清空输入框
  const onClear = () => {
    setCheckedList([]);
    toggleChildrenChecked(myOptions, false);
  };

  function dropdownRender(options = myOptions, prefix = '', parent: CascaderOptionType | null = null) {
    return options.map((item: any) => {
      const keyPath = [prefix, item.value].filter(item => item).join(':');
      item.keyPath = keyPath;
      item.parent = parent;
      return item.children?.length ? (
        <SubMenu
          key={keyPath}
          onTitleClick={(e: any) => e.domEvent.target.click()}
          title={
            <Checkbox
              indeterminate={item.indeterminate}
              onChange={e => onCheckAllChange(e, item, keyPath)}
              checked={item.checked}
            >
              {item.label}
            </Checkbox>
          }
        >
          {item.children?.length ? (
            dropdownRender(item.children, keyPath, item)
          ) : (
            <Menu.Item key={keyPath}>
              <Checkbox value={keyPath} checked={item.checked} onChange={e => onChange(e, item, keyPath)}>
                {item.label}
              </Checkbox>
            </Menu.Item>
          )}
        </SubMenu>
      ) : (
        <Menu.Item key={keyPath}>
          <Checkbox value={keyPath} checked={item.checked} onChange={e => onChange(e, item, keyPath)}>
            {item.label}
          </Checkbox>
        </Menu.Item>
      );
    });
  }
  return (
    <Select
      {...props}
      mode="multiple"
      allowClear={true}
      options={[]}
      value={checkedList as SelectValue}
      onDeselect={onDeselect as any}
      onClear={onClear}
      dropdownClassName="__multipleCascader"
      dropdownRender={() => (
        <Menu
          mode="vertical"
          multiple={true}
          selectable={true}
          subMenuCloseDelay={5}
          triggerSubMenuAction="click"
          getPopupContainer={() => document.querySelector('.__multipleCascader > div') || document.body}
        >
          {dropdownRender()}
        </Menu>
      )}
    />
  );
};
