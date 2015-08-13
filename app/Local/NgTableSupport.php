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
     * @param \Closure $custom Do not make queries that may change total rows number here.
     * @param array $searchFields
     * @param array $sortFields
     * @return NgTableSupport
     */
    public static function ngTable(Request $request, \Closure $custom = null, $searchFields = [], $sortFields = [])
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

        $aloneSearch = $request->get('q', null);

        $query = static::select();

        $query->where(function($clause) use ($filters, $aloneSearch, $searchFields) {
            foreach($filters as $field => $filter) {
                if(!in_array($field, $searchFields)) continue;
                $clause->orWhere($field, 'like', "%$filter%");
            }

            if($aloneSearch) {
                foreach($searchFields as $field) {
                    if(!in_array($field, $searchFields)) continue;
                    $clause->orWhere($field, 'like', "$aloneSearch%");
                }
            }
        });

        $total = $query->count();

        if (is_callable($custom)) {
            $query = $custom($query, [
                'search' => $aloneSearch,
                'filters' => $filters
            ]);
        }

        foreach ($sorting as $field => $type) {
            if(!in_array($field, $sortFields)) continue;
            $query->orderBy($field, $type == "asc" ? "ASC" : "DESC");
        }

        $query->limit($limit);
        $query->offset($offset);

        return new NgTableParcel($total, $query->get());
    }
}