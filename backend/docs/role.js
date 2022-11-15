const roleBody = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    roleName: { type: 'string', description: '角色名称' }
  }
};

const roleSchema = {
  queryAll: {
    description: '获取所有角色信息',
    tags: ['role'],
    summary: '获取所有角色信息'
  },
  queryList: {
    description: '获取角色列表',
    tags: ['role'],
    summary: '角色列表分页查询'
  },
  queryById: {
    description: '获取角色详情',
    tags: ['role'],
    summary: '通过id获取角色详情',
    querystring: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        }
      },
      required: ['id']
    }
  },
  add: {
    description: '创建新的角色',
    tags: ['role'],
    summary: '增加新的角色',
    body: {
      ...roleBody
    }
  },
  update: {
    description: '更新角色详情',
    tags: ['role'],
    summary: '通过id更新角色详情',
    body: {
      ...roleBody,
      required: ['id']
    }
  },
  delete: {
    description: '删除角色',
    tags: ['role'],
    summary: '通过id删除角色',
    querystring: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        }
      },
      required: ['id']
    }
  }
};

export default roleSchema;
