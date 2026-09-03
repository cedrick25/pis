<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Offline docket book queries against local MySQL `docket_book` table.
 * Never calls the Java service on port 8000.
 */
class Docket_book_model extends CI_Model
{
	const SOURCE_TABLE = 'docket_book';

	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	/**
	 * Paginated dockets for a client (offline GET /docketbook/offline/getclient/{clientId}).
	 *
	 * @param int $page
	 * @param int $size
	 * @param string $client_id
	 * @param string|null $type module type e.g. PIS_INV, PIS_SUP
	 * @return array Spring Page JSON
	 */
	public function getclient_paginated($page, $size, $client_id, $type = null)
	{
		if (!$this->db->table_exists(self::SOURCE_TABLE)) {
			return $this->build_spring_page(array(), $page, $size, 0);
		}

		$page = max(0, (int) $page);
		$size = max(1, min(500, (int) $size));
		$client_id = trim((string) $client_id);
		if ($client_id === '') {
			return $this->build_spring_page(array(), $page, $size, 0);
		}

		$type = ($type === null) ? '' : trim((string) $type);

		$apply_filters = function () use ($client_id, $type) {
			$this->db->where('client_id', $client_id);
			$this->apply_active_status_filter();
			if ($type !== '') {
				$this->db->where('type', $type);
			}
		};

		$this->db->from(self::SOURCE_TABLE);
		$apply_filters();
		$total = $this->db->count_all_results();

		$this->db->from(self::SOURCE_TABLE);
		$apply_filters();
		$this->db->order_by('docket_number', 'ASC');
		$this->db->limit($size, $page * $size);
		$rows = $this->db->get()->result_array();

		$content = array();
		foreach ($rows as $row) {
			$office_id = isset($row['field_office_id']) ? $row['field_office_id'] : null;
			$content[] = $this->map_source_row_to_response($row, $this->lookup_field_office_name($office_id));
		}

		return $this->build_spring_page($content, $page, $size, $total);
	}

	private function apply_active_status_filter()
	{
		$this->db->group_start();
		$this->db->where('status', 1);
		$this->db->or_where('status', true);
		$this->db->or_where('status', '1');
		$this->db->group_end();
	}

	private function lookup_field_office_name($field_office_id)
	{
		if ($field_office_id === null || $field_office_id === '') {
			return null;
		}
		if (!$this->db->table_exists('department')) {
			return null;
		}
		$row = $this->db->get_where('department', array('id' => $field_office_id), 1)->row_array();
		if (empty($row)) {
			return null;
		}
		return isset($row['name']) ? $row['name'] : null;
	}

	private function map_source_row_to_response($row, $field_office_name)
	{
		$bool = function ($v) {
			return $v === true || $v === 1 || $v === '1' || $v === 'true';
		};
		return array(
			'type' => isset($row['type']) ? $row['type'] : null,
			'docketNumber' => isset($row['docket_number']) ? $row['docket_number'] : null,
			'docketSeries' => isset($row['docket_series']) ? $row['docket_series'] : null,
			'caseloadType' => isset($row['caseload_type']) ? $row['caseload_type'] : null,
			'fieldOfficeId' => isset($row['field_office_id']) ? $row['field_office_id'] : null,
			'fieldOfficeName' => $field_office_name,
			'clientId' => isset($row['client_id']) ? $row['client_id'] : null,
			'clientType' => isset($row['client_type']) ? $row['client_type'] : null,
			'firstName' => isset($row['first_name']) ? $row['first_name'] : null,
			'middleName' => isset($row['middle_name']) ? $row['middle_name'] : null,
			'lastName' => isset($row['last_name']) ? $row['last_name'] : null,
			'suffixName' => isset($row['suffix_name']) ? $row['suffix_name'] : null,
			'fullName' => isset($row['full_name']) ? $row['full_name'] : null,
			'isLegalAge' => isset($row['is_legal_age']) ? $bool($row['is_legal_age']) : false,
			'pleaBargain' => isset($row['plea_bargain']) ? $bool($row['plea_bargain']) : false,
			'caseClassification' => isset($row['case_classification']) ? $row['case_classification'] : null,
			'criminalCaseNumber' => isset($row['criminal_case_number']) ? $row['criminal_case_number'] : null,
			'offense' => isset($row['offense']) ? $row['offense'] : null,
			'courtOfOrigin' => isset($row['court_of_origin']) ? $row['court_of_origin'] : null,
			'isMilitaryCourt' => isset($row['is_military_court']) ? $bool($row['is_military_court']) : false,
			'courtOrderDate' => isset($row['court_order_date']) ? $row['court_order_date'] : null,
			'investigatingOfficer' => isset($row['investigating_officer']) ? $row['investigating_officer'] : null,
			'receivedDateByPPO' => isset($row['received_date_by_ppo']) ? $row['received_date_by_ppo'] : null,
			'sentence' => isset($row['sentence']) ? $row['sentence'] : null,
			'manualDocket' => isset($row['manual_docket']) ? $bool($row['manual_docket']) : false,
			'referral' => isset($row['referral']) ? $bool($row['referral']) : false,
			'remarks' => isset($row['remarks']) ? $row['remarks'] : null,
			'probationStartDate' => isset($row['probation_start_date']) ? $row['probation_start_date'] : null,
			'probationYear' => isset($row['probation_year']) ? $row['probation_year'] : null,
			'probationMonth' => isset($row['probation_month']) ? $row['probation_month'] : null,
			'probationDay' => isset($row['probation_day']) ? $row['probation_day'] : null,
			'prisonName' => isset($row['prison_name']) ? $row['prison_name'] : null,
			'investigationReportSubmittedDate' => isset($row['ir_submitted_date']) ? $row['ir_submitted_date'] : null,
			'ppoRecommendation' => isset($row['ppo_recommendation']) ? $row['ppo_recommendation'] : null,
			'recommendationState' => isset($row['recommendation_state']) ? $row['recommendation_state'] : null,
			'dateOfTransfer' => isset($row['date_of_transfer']) ? $row['date_of_transfer'] : null,
			'transferredOfficeId' => isset($row['transferred_office_id']) ? $row['transferred_office_id'] : null,
			'dateOrderReceivedFromTheBoard' => isset($row['date_order_received_from_the_board']) ? $row['date_order_received_from_the_board'] : null,
			'boardOrder' => isset($row['board_order']) ? $row['board_order'] : null,
			'boardOrderStatus' => isset($row['board_order_status']) ? $row['board_order_status'] : null,
			'referringOfficeId' => isset($row['referring_office_id']) ? $row['referring_office_id'] : null,
			'dateCICAR' => isset($row['date_courtesy_inv_completed_and_return']) ? $row['date_courtesy_inv_completed_and_return'] : null,
			'supervisingOfficer' => isset($row['supervising_officer']) ? $row['supervising_officer'] : null,
			'supervisingOfficerCarryOver' => isset($row['supervising_officer_carry_over']) ? $row['supervising_officer_carry_over'] : null,
			'probationEndDate' => isset($row['probation_end_date']) ? $row['probation_end_date'] : null,
			'supervisionStartDate' => isset($row['supervision_start_date']) ? $row['supervision_start_date'] : null,
			'supervisionEndDate' => isset($row['supervision_end_date']) ? $row['supervision_end_date'] : null,
			'referralType' => isset($row['referral_type']) ? $row['referral_type'] : null,
			'dateReportSubmittedToTheBoard' => isset($row['date_report_submitted_to_the_board']) ? $row['date_report_submitted_to_the_board'] : null,
			'dateReportSubmittedToRDForTransferToOtherPPO' => isset($row['date_report_submitted_to_rd_for_transfer']) ? $row['date_report_submitted_to_rd_for_transfer'] : null,
			'resolutionType' => isset($row['resolution_type']) ? $row['resolution_type'] : null,
			'dateResolutionFromTheBoard' => isset($row['date_resolution_from_the_board']) ? $row['date_resolution_from_the_board'] : null,
			'dateResolutionFromTheRDForTransfer' => isset($row['date_report_resolution_from_the_rd_for_transfer']) ? $row['date_report_resolution_from_the_rd_for_transfer'] : null,
			'reportType' => isset($row['report_type']) ? $row['report_type'] : null,
			'id' => isset($row['id']) ? $row['id'] : null,
			'createdBy' => isset($row['created_by']) ? $row['created_by'] : null,
			'createdDate' => isset($row['created_date']) ? $row['created_date'] : null,
			'updatedBy' => isset($row['updated_by']) ? $row['updated_by'] : null,
			'updatedDate' => isset($row['updated_date']) ? $row['updated_date'] : null,
			'status' => isset($row['status']) ? $bool($row['status']) : true,
			'psirDate' => isset($row['psir_date']) ? $row['psir_date'] : null,
			'manifestationDate' => isset($row['manifestation_date']) ? $row['manifestation_date'] : null,
			'typeOfReferrals' => isset($row['type_of_referrals']) ? $row['type_of_referrals'] : null,
			'referralsNotActedUponDateOrderReceived' => isset($row['referrals_not_acted_upon_date_order_received']) ? $row['referrals_not_acted_upon_date_order_received'] : null,
			'alias' => isset($row['alias']) ? $row['alias'] : null,
			'courtDecision' => isset($row['court_decision']) ? $row['court_decision'] : null,
			'reasonForDenialDismissal' => isset($row['reason_for_denial_dismissal']) ? $row['reason_for_denial_dismissal'] : null,
			'SpecifyOtherTypeOfDecision' => isset($row['specify_other_type_of_decision']) ? $row['specify_other_type_of_decision'] : null,
			'dateOrderReceivedFromTheCourt' => isset($row['date_order_received_from_the_court']) ? $row['date_order_received_from_the_court'] : null,
			'dateCompletedAndReturned' => isset($row['date_completed_and_returned']) ? $row['date_completed_and_returned'] : null,
			'officeFindingsForActedUpon' => isset($row['office_findings_for_acted_upon']) ? $row['office_findings_for_acted_upon'] : null,
			'officeFindingsForPendingDisposition' => isset($row['office_findings_for_pending_disposition']) ? $row['office_findings_for_pending_disposition'] : null,
			'specifyCourtPpoTransferred' => isset($row['specify_court_ppo_transferred']) ? $row['specify_court_ppo_transferred'] : null,
			'specifyOtherReasonsRevocation' => isset($row['specify_other_reasons_revocation']) ? $row['specify_other_reasons_revocation'] : null,
			'periodOfSupervision' => isset($row['period_of_supervision']) ? $row['period_of_supervision'] : null,
			'FromPrisonType' => isset($row['from_prison_type']) ? $row['from_prison_type'] : null,
			'specifyOtherSubmittedReports' => isset($row['specify_other_submitted_reports']) ? $row['specify_other_submitted_reports'] : null,
			'otherResolutionType' => isset($row['other_resolution_type']) ? $row['other_resolution_type'] : null,
			'periodOfCourtesySupervision' => isset($row['period_of_courtesy_supervision']) ? $row['period_of_courtesy_supervision'] : null,
			'dateReturned' => isset($row['date_returned']) ? $row['date_returned'] : null,
			'referringOfficeCourtesyInv' => isset($row['referring_office_courtesy_inv']) ? $row['referring_office_courtesy_inv'] : null,
			'referringOfficeCourtesyInvId' => isset($row['referring_office_courtesy_inv_id']) ? $row['referring_office_courtesy_inv_id'] : null,
			'referringOfficeCourtesySup' => isset($row['referring_office_courtesy_sup']) ? $row['referring_office_courtesy_sup'] : null,
			'referringOfficeCourtesySupId' => isset($row['referring_office_courtesy_sup_id']) ? $row['referring_office_courtesy_sup_id'] : null,
		);
	}

	private function build_spring_page($content, $page, $size, $total)
	{
		$total = (int) $total;
		$size = max(1, (int) $size);
		$page = max(0, (int) $page);
		$total_pages = $size > 0 ? (int) ceil($total / $size) : 0;
		$count = count($content);
		return array(
			'content' => $content,
			'pageable' => array(
				'sort' => array('sorted' => false, 'unsorted' => true, 'empty' => true),
				'pageNumber' => $page,
				'pageSize' => $size,
				'offset' => $page * $size,
				'paged' => true,
				'unpaged' => false,
			),
			'totalElements' => $total,
			'totalPages' => $total_pages,
			'last' => ($total_pages === 0) || ($page >= $total_pages - 1),
			'size' => $size,
			'number' => $page,
			'sort' => array('sorted' => false, 'unsorted' => true, 'empty' => true),
			'first' => $page === 0,
			'numberOfElements' => $count,
			'empty' => $count === 0,
		);
	}
}
