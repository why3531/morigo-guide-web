---
title: Codex + CC Switch 账号管理教程
date: 2026-05-09
description: 一篇从零开始的 Codex 与 CC Switch 账号管理实践，覆盖多账号切换、隔离、常见问题排查和日常维护建议。
category: 教程
tags: [Codex, CC Switch, 账号管理, 实战]
cover:
draft: false
---

# Codex + CC Switch 账号管理教程

这篇文章面向「需要同时管理多个账号」的同学，目标是做到三件事：

1. 切换快：在不同账号间切换时不混乱。  
2. 隔离稳：避免 token、配置、缓存互相污染。  
3. 可回滚：出问题时能快速定位并恢复。

## 适用场景

- 你有个人账号 + 团队账号，需要分开使用。  
- 你有国内网络环境与海外网络环境的切换需求。  
- 你需要在多个项目中维持独立的 API Key 与运行上下文。

## 核心思路

`Codex` 负责你的日常工作流，`CC Switch` 负责账号与环境切换。  
实践上不要追求“一个环境包打天下”，而是把账号管理拆成独立配置单元：

- 账号维度：每个账号一套认证信息。  
- 项目维度：每个项目一套环境变量与默认模型配置。  
- 终端维度：每个终端会话只绑定一个账号上下文。

## 推荐目录结构

```bash
~/workspace/
  project-a/
  project-b/

~/.config/
  codex/
    profiles/
      personal.env
      team.env
```

`personal.env` 与 `team.env` 分别维护不同账号相关变量，这样切换时更可控。

## 第一步：准备账号配置

创建两套环境变量文件（示例）：

```bash
# personal.env
OPENAI_API_KEY=sk-xxxxx
OPENAI_BASE_URL=https://api.openai.com/v1
CODEX_PROFILE=personal
```

```bash
# team.env
OPENAI_API_KEY=sk-yyyyy
OPENAI_BASE_URL=https://api.openai.com/v1
CODEX_PROFILE=team
```

建议：

- 不要把 `.env` 提交到仓库。  
- 每套配置都保留 `CODEX_PROFILE` 这类可读标记，方便你确认当前身份。

## 第二步：在 CC Switch 中注册切换项

你可以把每个账号配置注册为一个切换目标，例如：

- `codex-personal`
- `codex-team`

每次切换后，先在终端验证关键变量：

```bash
echo $CODEX_PROFILE
echo $OPENAI_BASE_URL
```

如果输出不符合预期，不要直接开始工作，先重新加载当前配置。

## 第三步：项目级绑定策略

推荐一个简单规则：

- 个人项目默认使用 `personal`。  
- 团队项目默认使用 `team`。  
- 开启新终端后第一步先切换，再进入项目目录。

可在项目 README 顶部加一段提示，防止误用账号。

## 第四步：验证切换是否生效

在 Codex 中做一次最小验证：

1. 打开一个测试项目。  
2. 读取当前关键变量。  
3. 跑一个轻量请求（例如列模型或最小对话调用）。  
4. 切换账号后重复一次，对比返回结果与配额归属。

这样能在 1 分钟内确认你是否处于正确账号上下文。

## 常见问题排查

### 1) 切换后仍然命中旧账号

优先检查：

- 当前终端是否是旧会话。  
- shell 启动脚本是否又覆盖了变量。  
- IDE 内置终端是否缓存了旧环境。

处理方式：

- 关闭终端重新开。  
- 重新执行切换命令。  
- 再次 `echo $CODEX_PROFILE` 验证。

### 2) 某个项目总是用错配置

通常是项目里有本地 `.env` 覆盖了全局变量。  
建议明确优先级：`CC Switch > 项目 .env > 默认 shell 变量`，并统一团队约定。

### 3) 网络可达但请求异常

检查 `OPENAI_BASE_URL` 是否与当前网络策略匹配，必要时为不同账号配置不同网关地址。

## 安全建议

- API Key 只放在本地安全存储，不写进仓库。  
- 定期轮换高权限 key。  
- 团队账号与个人账号严格分离，不共用配置文件。  
- 离职/角色变更时及时清理本地历史配置。

## 日常使用清单

- [ ] 开工前确认 `CODEX_PROFILE`。  
- [ ] 进入项目后确认当前账号与项目匹配。  
- [ ] 提交前检查是否混入敏感变量。  
- [ ] 收工前清理不再使用的临时会话。

## 总结

账号管理的关键不是“切换功能本身”，而是稳定的流程习惯。  
你只要把「配置拆分、终端隔离、切换后验证」这三步长期执行，Codex + CC Switch 的多账号协作会非常顺畅。
