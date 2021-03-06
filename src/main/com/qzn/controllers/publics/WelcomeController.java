package com.qzn.controllers.publics;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.qzn.auth.Authenticator;
import com.qzn.controllers.AbstractController;
import com.qzn.controllers.Page;
import com.qzn.models.Login;
import com.qzn.models.User;
import com.qzn.services.UserService;
import com.qzn.utils.DateUtil;
import com.qzn.utils.DateUtil.CalendarType;
import com.qzn.utils.PropertyUtil;

@Controller
@RequestMapping("/welcome")
public class WelcomeController extends AbstractController {

	@Autowired
	private UserService userService;

	@ModelAttribute("login")
	public Login loadLogin() throws Exception {
		return new Login();
	}

	@RequestMapping("")
	public Page welcome() throws Exception {
		return Page("filters-welcome");
	}

	@RequestMapping("/login")
	public Page login(Login login) throws Exception {
		User loginUser = userService.auth(login.getUsername(), login.getPassword());
		getSession().invalidate();
		if (loginUser == null) {
			return Page("filters-welcome", "login", login, "msg", "errors.validation.login.failed");
		}
		if (loginUser.getLoginLockStatus() == User.LOGIN_LOCK_STATUS_LOCKING) {
			return Page("filters-welcome", "login", login, "msg", "errors.validation.login.locked");
		}
		if (loginUser.getDeleteFlag() == User.DELETE_FLAG_DELETED) {
			return Page("filters-welcome", "login", login, "msg", "errors.validation.login.deleted");
		}
		String timeout = PropertyUtil.getPropertyValue("password.date.timeout");
		Date endTime = DateUtil.addTime(loginUser.getPasswordChangeDatetime(), CalendarType.DATE,
				Integer.parseInt(timeout));
		if (endTime.getTime() < DateUtil.getSysdate().getTime()
				&& loginUser.getPasswordStatus() == User.PASSWORD_STATUS_USERRESET) {
			loginUser.setPasswordStatus(User.PASSWORD_STATUS_SYSINIT);
			userService.saveUser(loginUser);
		}
		if (loginUser.getLoginErrorCount() > 0) {
			loginUser.setLoginErrorCount(0);
			userService.saveUser(loginUser);
		}
		setLoginUser(loginUser);
		if (loginUser.getPasswordStatus() == User.PASSWORD_STATUS_SYSINIT) {
			return RedirectPage("changepassword");
		} else {
			return RedirectPage("dashboard");
		}
	}

	@RequestMapping("/logout")
	public Page logout() {
		Authenticator.clearActiveUser();
		getSession().invalidate();
		return Page("filters-welcome");
	}

}
