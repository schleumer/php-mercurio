<?php

namespace App\Local;

use Illuminate\Http\Request;

/**
 * Class NgTableSupport
 * @package App\Local
 */
trait NgTableSupport
{
    /**
     * @param \Illuminate\Http\Request $request
     * @param \Closure $custom
     * @return NgTableSupport
     */
    public static function ngTable(Request $request, \Closure $custom = null)
    {
        $limit = (int)$request->get('count', 10);
        $page = (int)$request->get('page', 1);
        $offset = $limit * ($page - 1);

        $sorting = $request->get('sorting', array());
        if (!is_array($sorting)) {
            $sorting = array();
        }

        $filters = $request->get('filter', array());
        if (!is_array($filters)) {
            $filters = array();
        }

        /* @var \Illuminate\Database\Query\Builder $query */
        $query = static::select();

        if (is_callable($custom)) {
            $custom($query);
        }

        foreach ($sorting as $field => $type) {
            $query->orderBy($field, $type == "asc" ? "ASC" : "DESC");
        }

        foreach($filters as $field => $filter) {
            $query->orWhere($field, 'like', "%$filter%");
        }

        $total = $query->count();

        $query->limit($limit);
        $query->offset($offset);

        return new NgTableParcel($total, $query->get());
    }
}