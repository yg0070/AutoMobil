package com.jy.am.model.po;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;
import com.jy.am.common.base.ModelParent;

import java.math.BigDecimal;

/**
 * <p>
 * 差旅费收款人
 * </p>
 *
 * @author joyi
 * @since 2017-12-06
 */
@TableName("bx_payee")
public class Payee extends ModelParent {

    private static final long serialVersionUID = 1L;

	private String id;

	/**
	 * 收款人 (员工表关联)
	 */
	@TableField(exist = false)
	private String payeeName;

	/**
	 * 金额
	 */
	private BigDecimal money;

	/**
	 * 机构id
	 */
	@TableField("department_id")
	private String departmentId;
	/**
	 * 机构name
	 */
	@TableField("department_name")
	private String departmentName;

	@TableField("bear_department_id")
	private String bearDepartmentId;

	@TableField("bear_department_name")
	private String bearDepartmentName;
    /**
     * 报销单id
     */
	@TableField("reimbursement_id")
	private String reimbursementId;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public BigDecimal getMoney() {
		return money;
	}

	public void setMoney(BigDecimal money) {
		this.money = money;
	}

	public String getReimbursementId() {
		return reimbursementId;
	}

	public void setReimbursementId(String reimbursementId) {
		this.reimbursementId = reimbursementId;
	}

	public String getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public String getPayeeName() {
		return payeeName;
	}

	public void setPayeeName(String payeeName) {
		this.payeeName = payeeName;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getBearDepartmentId() {
		return bearDepartmentId;
	}

	public void setBearDepartmentId(String bearDepartmentId) {
		this.bearDepartmentId = bearDepartmentId;
	}

	public String getBearDepartmentName() {
		return bearDepartmentName;
	}

	public void setBearDepartmentName(String bearDepartmentName) {
		this.bearDepartmentName = bearDepartmentName;
	}
}
