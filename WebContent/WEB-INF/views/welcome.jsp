<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page trimDirectiveWhitespaces="true"%>
<%@taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="q" uri="http://www.quzhinan.com/tags"%>
<html class="fullscreen-bg">
<div class="vertical-align-wrap">
	<div class="vertical-align-middle">
		<div class="auth-box ">
			<div class="left">
				<div class="content">
					<div class="header">
						<div class="logo text-center">
							<img src="<q:url value='/images/logo-dark.png'/>"
								alt="Klorofil Logo">
						</div>
						<p class="lead">登录</p>
					</div>
					<q:url var="urlPost" action="welcome" method="login" />
					<form:form modelAttribute="login" action="${urlPost}" method="post">
						<div class="form-group">
							<label class="control-label sr-only">用户名/邮箱</label>
							<form:input type="text" class="form-control" path="username"
								placeholder="用户名" value="${login.username}" />
						</div>
						<div class="form-group">
							<label class="control-label sr-only">密码</label>
							<form:input type="password" class="form-control" path="password"
								placeholder="密码" value="${login.password}" />
						</div>
						<div class="form-group">
							<c:if test="${not empty msg}">
								<fmt:message key="${msg}" />
							</c:if>
						</div>
						<button type="submit" class="btn btn-primary btn-lg btn-block">登录</button>
						<div class="btn-bottom">
							<q:url var="urlRegister" action="register" />
							<q:url var="urlResetPassword" action="resetpassword" />
							<span class="helper-text"><i class="fa fa-plus"></i> <a
								href="${urlRegister}">注册</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<span class="helper-text"><i class="fa fa-lock"></i> <a
								href="${urlResetPassword}">忘记密码</a></span>
						</div>
					</form:form>
				</div>
			</div>
			<div class="right">
				<div class="overlay"></div>
				<div class="content text">
					<h1 class="heading"></h1>
				</div>
			</div>
		</div>
	</div>
</div>
</html>